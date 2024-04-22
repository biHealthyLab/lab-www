---
type: Conference
title: |
  "Mostafa Sharifzadeh will be an invited speaker at the Mila Health + AI on April 22, 2024. He will be presenting his work on an innovative approach to ultrasound imaging"
date: 2024-04-21
link:
---

### Description

**Phase Aberration Correction: A Deep Learning-Based Aberration-to-Aberration Approach**

One of the primary sources of suboptimal image quality in ultrasound imaging is phase aberration. It is caused by spatial changes in sound speed over a heterogeneous medium, which disturbs the transmitted waves and prevents coherent summation of echo signals. Obtaining non-aberrated ground truths in real-world scenarios can be extremely challenging, if not impossible. This challenge hinders the performance of deep learning-based techniques due to the domain shift between simulated and experimental data. In this talk, I will present one of our recent studies wherein we propose a deep learning-based method that does not require ground truth to correct the phase aberration problem and, as such, can be directly trained on real data. We trained a network wherein both the input and target output are randomly aberrated radio frequency (RF) data. Moreover, we demonstrated that a conventional loss function such as mean square error is inadequate for training such a network to achieve optimal performance. Instead, we proposed an adaptive mixed loss function that employs both B-mode and RF data.