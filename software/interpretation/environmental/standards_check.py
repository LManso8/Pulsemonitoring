"""
standards_check.py - Módulo de Interpretação Ambiental e Estrutural
===================================================================
Contém a lógica de negócio para a avaliação de limites dinâmicos de vibração.
Calcula os limites baseados na frequência dominante e determina a métrica de
avaliação correta (PPV ou PVS) consoante a norma exigida.
"""

import numpy as np

def obter_limite_dinamico(norma, estrutura, frequencia):
    """
    Retorna o limite máximo de velocidade (mm/s) permitido para uma dada
    frequência dominante, baseado na norma e no tipo de infraestrutura.
    """
    if norma == "NP 2074":
        if frequencia <= 10.0: 
            return {"Sensivel": 1.5, "Corrente": 3.0, "Reforcada": 6.0}.get(estrutura, 3.0)
        elif frequencia <= 40.0: 
            return {"Sensivel": 3.0, "Corrente": 6.0, "Reforcada": 12.0}.get(estrutura, 6.0)
        else: 
            return {"Sensivel": 6.0, "Corrente": 12.0, "Reforcada": 40.0}.get(estrutura, 12.0)
            
    elif norma == "DIN 4150-3":
        if frequencia <= 10.0: 
            return {"Sensivel": 3.0, "Residencial": 5.0, "Industrial": 20.0}.get(estrutura, 5.0)
        elif frequencia <= 50.0: 
            return {"Sensivel": 8.0, "Residencial": 15.0, "Industrial": 40.0}.get(estrutura, 15.0)
        else: 
            return {"Sensivel": 10.0, "Residencial": 20.0, "Industrial": 50.0}.get(estrutura, 20.0)
            
    elif norma == "Ambiental/Ocupacional":
        # Limites estáticos independentes da frequência para controlo de detonações e ruído de fundo
        return 0.30 if estrutura == "Detonacao (Impulsiva)" else 0.15
        
    elif norma == "BS 6472-1":
        # Limite estático focado no conforto humano face a máquinas rotativas
        return 1.0 
        
    return 3.0 # Fallback de segurança

def calcular_vetor_analise(norma, vx, vy, vz):
    """
    Seleciona o método de cálculo cinemático (PVS ou PPV) exigido pela norma.
    
    Parâmetros:
    vx, vy, vz : Arrays numpy contendo o sinal de velocidade em cada eixo (mm/s).
    
    Retorna:
    linha_analise : O array resultante (1D) a ser comparado com o limite.
    valor_maximo  : O pico máximo absoluto registado no evento.
    metrica       : A designação textual do método utilizado.
    """
    if norma == "NP 2074":
        # A norma portuguesa exige PVS (Peak Vector Sum) - Raiz da soma dos quadrados
        linha_analise = np.sqrt(vx**2 + vy**2 + vz**2)
        metrica = "PVS (Vetor Resultante 3D)"
    else:
        # A DIN 4150-3 e restantes normas exigem PPV (Peak Particle Velocity) - Maior eixo isolado
        linha_analise = np.maximum(np.maximum(np.abs(vx), np.abs(vy)), np.abs(vz))
        metrica = "PPV (Maior Eixo Isolado)"

    valor_maximo = float(np.max(linha_analise))
    
    return linha_analise, valor_maximo, metrica

def avaliar_conformidade(valor_maximo, limite_atual):
    """
    Compara o valor máximo registado com o limite dinâmico da norma.
    Retorna True se a estrutura estiver em risco (Alerta).
    """
    em_risco = valor_maximo > limite_atual
    return em_risco
