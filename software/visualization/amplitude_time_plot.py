"""
amplitude_time_plot.py - Motor de Renderização no Domínio do Tempo
===================================================================
Gera a representação visual (Sismograma) da cinemática estrutural.
Plota os vetores de velocidade ortogonais e injeta os limites
normativos dinâmicos para validação visual imediata de conformidade.
"""

import matplotlib.pyplot as plt

def plotar_sismograma(tempo, vx, vy, vz, limite_normativo=None, titulo="Análise Cinemática (Sismograma)"):
    """
    Renderiza as curvas de velocidade (mm/s) no domínio do tempo.
    
    Parâmetros:
    tempo            : Array temporal relativo (s).
    vx, vy, vz       : Arrays de velocidade em cada eixo (mm/s).
    limite_normativo : Float (opcional) indicando o limite de alerta (mm/s).
    titulo           : String para o cabeçalho do gráfico.
    
    Retorna:
    fig : Objeto Figure do Matplotlib renderizado em memória.
    """
    # Inicializa a figura com proporções otimizadas para ecrã panorâmico
    fig, ax = plt.subplots(figsize=(10, 5))
    
    # Plotagem cinemática triaxial com paleta de cores de alto contraste
    ax.plot(tempo, vx, label="Eixo X (Transversal)", color='#1f77b4', linewidth=1.2, alpha=0.85)
    ax.plot(tempo, vy, label="Eixo Y (Longitudinal)", color='#ff7f0e', linewidth=1.2, alpha=0.85)
    ax.plot(tempo, vz, label="Eixo Z (Vertical)", color='#2ca02c', linewidth=1.2, alpha=0.85)
    
    # Injeção dinâmica do threshold de conformidade (Norma Ambiental)
    if limite_normativo is not None:
        ax.axhline(y=limite_normativo, color='red', linestyle='--', linewidth=1.5, 
                   label=f"Limite Legal ({limite_normativo:.2f} mm/s)")
        # Injeta o limite inferior espelhado para ondas negativas
        ax.axhline(y=-limite_normativo, color='red', linestyle='--', linewidth=1.5, alpha=0.5)
        
    # Formatação académica do layout
    ax.set_title(titulo, fontsize=12, fontweight='bold')
    ax.set_xlabel("Tempo Relativo [s]", fontsize=10)
    ax.set_ylabel("Velocidade Cinemática [mm/s]", fontsize=10)
    
    # Adiciona uma grelha leve para facilitar a leitura dos picos
    ax.grid(True, linestyle=':', alpha=0.6)
    
    # Posiciona a legenda para não ocultar picos iniciais
    ax.legend(loc='upper right', fontsize=9, framealpha=0.9)
    
    # Ajusta as margens para não haver cortes na exportação para PDF
    fig.tight_layout()
    
    return fig
