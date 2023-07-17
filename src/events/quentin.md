---
title: "Implicit Differentiation of Lasso-type Model: Application to Neuroimaging"
speaker: Quentin Bertrand (UdeM, MILA)
event_date: 2023-07-13
place: EV
---


### Abstract

Finding the optimal hyperparameters of a model can be cast as a bilevel optimization problem, typically solved using zero-order techniques. In this work we study first-order methods when the inner optimization problem is convex but non-smooth. We show that the forward-mode differentiation of proximal gradient descent and proximal coordinate descent yield sequences of Jacobians converging toward the exact Jacobian. Using implicit differentiation, we show it is possible to leverage the non-smoothness of the inner problem to speed up the computation. Finally, we provide a bound on the error made on the hypergradient when the inner optimization problem is solved approximately. Results on regression and classification problems reveal computational benefits for hyperparameter optimization, especially when multiple hyperparameters are required.

**Paper**: https://arxiv.org/pdf/2105.01637.pdf

**Code**: https://github.com/qb3/sparse-ho