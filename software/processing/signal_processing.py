"""
signal_processing.py - Motor de Processamento Digital de Sinal (DSP)
===================================================================
Executa a mitigação de drift, integração cinemática e análise espetral
(FFT) sobre os dados brutos de aceleração adquiridos pelo hardware.
"""

import numpy as np
from scipy.signal import detrend
from scipy.integrate import cumtrapz
from scipy.fft import fft, fftfreq

def processar_cinematica(tempo, acel_x, acel_y, acel_z):
    """
    Transforma sinais físicos de aceleração em velocidade estrutural.
    
    Aplica um filtro de 'detrend' duplo: antes e depois da integração
    numérica, para garantir a eliminação absoluta de drift de hardware
    e de erros cumulativos do algoritmo trapezoidal.
    
    Parâmetros:
    tempo  : Array com o delta temporal relativo (segundos).
    acel_x, acel_y, acel_z : Arrays de aceleração bruta (m/s²).
    
    Retorna:
    vx_mm, vy_mm, vz_mm : Arrays de velocidade processada (mm/s).
    """
    # Passo 1: Remoção do offset DC inicial do sensor (Detrend na Aceleração)
    ax_limpo = detrend(acel_x)
    ay_limpo = detrend(acel_y)
    az_limpo = detrend(acel_z)
    
    # Passo 2: Integração Numérica (Regra dos Trapézios) de m/s² para m/s
    # initial=0 garante que o array resultante mantém o mesmo tamanho do tempo
    vx_m = cumtrapz(ax_limpo, tempo, initial=0)
    vy_m = cumtrapz(ay_limpo, tempo, initial=0)
    vz_m = cumtrapz(az_limpo, tempo, initial=0)
    
    # Passo 3: Remoção do Drift Numérico (Detrend na Velocidade)
    vx_limpo = detrend(vx_m)
    vy_limpo = detrend(vy_m)
    vz_limpo = detrend(vz_m)
    
    # Passo 4: Conversão para a dimensão normativa (m/s -> mm/s)
    vx_mm = vx_limpo * 1000.0
    vy_mm = vy_limpo * 1000.0
    vz_mm = vz_limpo * 1000.0
    
    return vx_mm, vy_mm, vz_mm

def calcular_fft(tempo, sinal_velocidade):
    """
    Aplica a Transformada Rápida de Fourier (FFT) para isolar
    o espetro de frequências do evento vibratório.
    
    Parâmetros:
    tempo            : Array temporal.
    sinal_velocidade : Array 1D da velocidade (geralmente o eixo com maior pico ou PVS).
    
    Retorna:
    frequencia_dominante : A frequência de ressonância (Hz) com maior energia.
    freqs, amplitudes    : Arrays necessários para a plotagem do espetro.
    """
    # Número de amostras e cálculo da Taxa de Amostragem (Fs)
    N = len(tempo)
    if N < 2:
        return 0.0, np.array([]), np.array([])
        
    dt = tempo[1] - tempo[0]  # Resolução temporal
    
    # Execução da Transformada de Fourier
    # Utilizamos abs() para obter a magnitude e normalizamos por N
    sinal_fft = fft(sinal_velocidade)
    amplitudes = (2.0 / N) * np.abs(sinal_fft[0:N//2])
    
    # Mapeamento do eixo das frequências
    freqs = fftfreq(N, dt)[0:N//2]
    
    # Isolamento do pico de energia (Frequência Dominante)
    # Ignoramos o índice 0 (frequência 0 Hz / componente DC residual)
    indice_pico = np.argmax(amplitudes[1:]) + 1 
    frequencia_dominante = freqs[indice_pico]
    
    return float(frequencia_dominante), freqs, amplitudes
