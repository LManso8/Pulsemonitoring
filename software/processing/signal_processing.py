"""
signal_processing.py - Motor de Processamento Digital de Sinal (DSP)
===================================================================
Executa a integração cinemática (Soma Cumulativa Retangular) e análise
espetral (FFT) sobre os dados brutos de aceleração adquiridos pelo hardware.
"""

import numpy as np
from scipy.fft import fft, fftfreq
from scipy.signal import detrend

def converter_aceleracao_para_velocidade(accel_ms2, dt):
    """ 
    Integra a aceleração (m/s²) para obter velocidade (mm/s).
    Utiliza soma cumulativa (cumsum) multiplicada pelo delta temporal,
    seguida de mitigação de drift via detrend linear para estabilizar a baseline.
    """
    vel_m_s = np.cumsum(accel_ms2) * dt
    vel_m_s_limpa = detrend(vel_m_s)
    
    # Conversão de m/s para dimensão normativa (mm/s)
    return vel_m_s_limpa * 1000.0

def compute_fft(signal, sample_rate):
    """
    Aplica a Transformada Rápida de Fourier (FFT) isolando apenas
    o espetro de frequências positivas (mask = xf > 0).
    """
    n = len(signal)
    yf = fft(signal)
    xf = fftfreq(n, 1.0 / sample_rate)
    
    # Máscara para ignorar frequências negativas e o componente DC
    mask = xf > 0
    
    # Retorna as frequências e as magnitudes normalizadas
    return xf[mask], (2.0 / n * np.abs(yf))[mask]

def dominant_frequency(xf, yf):
    """ Extrai o pico de frequência dominante de ressonância. """
    return float(xf[np.argmax(yf)]) if len(xf) > 0 else 0.0
