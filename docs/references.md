# References

## Standards

- **NP 2074:2015** — *Avaliação da Influência em Construções Sensíveis de
  Vibrações Provocadas por Explosões ou Outras Ações Impulsivas.* Instituto
  Português da Qualidade.
- **DIN 4150-3:2016** — *Erschütterungen im Bauwesen — Teil 3: Einwirkungen
  auf bauliche Anlagen* (Structural vibration — Part 3: Effects on
  structures). Deutsches Institut für Normung.
- **BS 5228-2** — *Code of practice for noise and vibration control on
  construction and open sites — Part 2: Vibration.* British Standards
  Institution.
- **ISO 2631-2** — *Mechanical vibration and shock — Evaluation of human
  exposure to whole-body vibration — Part 2: Vibration in buildings.*
  International Organization for Standardization.
- **BS 6472-1** — *Guide to evaluation of human exposure to vibration in
  buildings — Part 1: Vibration sources other than blasting.* British
  Standards Institution. (Used for the rotating-machinery limit.)

## Seismology

- **Wald, D. J., Quitoriano, V., Heaton, T. H., & Kanamori, H. (1999).**
  *Relationships between peak ground acceleration, peak ground velocity,
  and modified Mercalli intensity in California.* Earthquake Spectra,
  15(3), 557–564.
  — Source of the empirical relationship used to convert PGV to Modified
  Mercalli Intensity: `IMM = 3.47 · log10(PGV_cm/s) + 2.35`.

## Signal processing

- **Virtanen, P. et al. (2020).** *SciPy 1.0: fundamental algorithms for
  scientific computing in Python.* Nature Methods, 17, 261–272.
  — `scipy.signal.detrend` and `scipy.fft` used in the processing pipeline.
- **Harris, C. R. et al. (2020).** *Array programming with NumPy.* Nature,
  585, 357–362.
  — `numpy.cumsum` used for numerical integration of the acceleration
  signal.

## Hardware

- **Raspberry Pi Foundation.** *Raspberry Pi Pico W datasheet.*
  https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html

> Add the exact accelerometer datasheet/part number here once confirmed,
> e.g. manufacturer, model, I2C address, and the datasheet URL or PDF
> reference under `hardware/schematics/`.
