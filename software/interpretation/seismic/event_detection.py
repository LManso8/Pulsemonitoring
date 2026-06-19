"""
event_detection.py - Módulo de Deteção Sísmica e Escala de Mercalli
===================================================================
Contém a lógica de negócio para processar eventos transitórios e traduzir 
a Velocidade de Pico do Solo (PGV) para a Escala de Intensidade de 
Mercalli Modificada (MMI), aplicando as equações logarítmicas empíricas.
"""

import numpy as np
import math

def calcular_pgv(vx, vy, vz, metodo="vetor_3d"):
    """
    Calcula a Velocidade de Pico do Solo (Peak Ground Velocity - PGV).
    
    Parâmetros:
    vx, vy, vz : Arrays de velocidade integrada em mm/s.
    metodo     : 'vetor_3d' (Norma Euclidiana) ou 'eixo_isolado'.
    """
    if metodo == "vetor_3d":
        # Fórmula: Máximo da raiz quadrada da soma dos quadrados dos três eixos
        vetor_resultante = np.sqrt(vx**2 + vy**2 + vz**2)
        pgv = float(np.max(vetor_resultante))
    else:
        # Fórmula: Pico máximo absoluto transversal a todos os eixos
        pgv = float(np.max([np.max(np.abs(vx)), np.max(np.abs(vy)), np.max(np.abs(vz))]))
        
    return pgv

def equacao_wald_mercalli(pgv_mm_s):
    """
    Aplica a equação empírica de Wald et al. (1999) para correlação
    entre a velocidade instrumental (PGV) e a intensidade macrossísmica.
    
    A fórmula original de Wald utiliza cm/s. Como o nosso sinal
    está em mm/s, aplicamos o fator de conversão (pgv / 10).
    """
    # Conversão de mm/s para cm/s (requisito da equação empírica)
    pgv_cm_s = pgv_mm_s / 10.0
    
    # Prevenção de logaritmos nulos para sinais residuais
    if pgv_cm_s <= 0.1:
        return 1.0  # MMI I
        
    # Fórmula empírica para intensidades moderadas a severas
    mmi_calculado = 3.47 * math.log10(pgv_cm_s) + 2.35
    
    # Limitação aos limites físicos da escala (I a X)
    return max(1.0, min(10.0, mmi_calculado))

def classificar_mercalli(pgv_mm_s):
    """
    Mapeia o PGV calculando o valor logarítmico exato e retornando
    o grau romano e a respetiva descrição fenomenológica.
    """
    # 1. Obter o valor numérico exato através da fórmula logarítmica
    mmi_valor = equacao_wald_mercalli(pgv_mm_s)
    
    # 2. Arredondar para o Grau de Intensidade mais próximo
    grau_inteiro = round(mmi_valor)
    
    # 3. Mapear para a nomenclatura romana e fenomenológica
    escaloes = {
        1: ("I", "Instrumental (Não sentido)"),
        2: ("II", "Ligeiro (Sentido em repouso)"),
        3: ("III", "Ligeiro (Sentido no interior)"),
        4: ("IV", "Moderado (Janelas tremem)"),
        5: ("V", "Forte (Sentido no exterior)"),
        6: ("VI", "Bastante Forte (Danos em estuque)"),
        7: ("VII", "Muito Forte (Danos ligeiros estruturais)"),
        8: ("VIII", "Ruinoso (Queda de muros)"),
        9: ("IX", "Destrutivo (Danos severos generalizados)"),
        10: ("X+", "Desastroso (Colapso eminente)")
    }
    
    # Garante que não falha se o grau for muito alto ou muito baixo
    grau_romano, descricao = escaloes.get(grau_inteiro, ("Out of Bounds", "Erro de Escala"))
    
    return grau_romano, descricao, mmi_valor
