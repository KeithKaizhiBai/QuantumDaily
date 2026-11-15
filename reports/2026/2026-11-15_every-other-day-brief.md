---
issue_date: 2026-11-15
report_type: every-other-day-brief
status: published
timezone: Asia/Shanghai
coverage_start: 2026-11-13
coverage_end: 2026-11-15
research_cutoff: "2026-11-15T17:22:26+08:00"
---

**量子算法工程师隔日简报｜第012期**

刊期 2026 年 11 月 15 日｜北京时间 11 月 13 日 09:43:09 至 11 月 15 日 17:22:26｜含上期检索缺口补漏｜阅读约 6—8 分钟

**本期优先关注：用实测噪声指标做同预算外推**

本窗口核实到 Caltech–Broadcom 合作近况和 IonQ 管理团队调整。技术部分补充上期未覆盖的三篇预印本：bnZNE 的真机误差缓解、Pauli 传播的并行分区，以及小型分类器的完整硬件训练。三篇均早于上期截止，本期按补漏收录；最适合先做的练习是检验噪声外推的横轴、拟合偏差和采样成本。

**1．bnZNE 用配对基准线路校准外推横轴**

*学界与研究机构 × 科学与工程。补漏：11 月 12 日 15:41:36 UTC 提交的预印本，含 IBM、IQM 真机实验。*

DLR 的 Harris、Lively 与 Schuhmacher 将 benchmarked-noise zero-noise extrapolation 扩展到随机化线路，使其能结合 Pauli twirling 和读出误差处理。方法为应用线路构造门结构相近、理想输出可经典确定的基准线路，在各噪声档位测量基准偏离理想结果的程度，再以这一实测指标代替标称折叠倍数进行外推。外推因此可以利用实际噪声随折叠档位变化的测量信息。 [预印本与日期](https://arxiv.org/abs/2611.16971) · [基准条件与随机化协议](https://arxiv.org/html/2611.16971v1#S2)

IBM 实验在 ibm_fez 上比较 Ising 动力学、受限 QFT 和五比特 Grover 等线路。论文所列数据采样预算为每项应用 196,608 shots：标准 ZNE 在三个折叠档位各取 32 个随机化线路，每条 2,048 shots；bnZNE 加入配对基准线路，将每条减至 1,024 shots。论文以各比特缓解后 Z 期望值与精确值之比的平均为指标；所测各应用的这一均值均更接近 1，部分深线路的方差增大。完整耗时还取决于线路数量、校准和作业调度。 [实验设置与结果](https://arxiv.org/html/2611.16971v1#S4)

实现时最关键的是基准与应用经历可比较的噪声。论文从编译后的原生门序列构造基准，并要求替换门具有相当的误差。PennyLane 可负责小线路与噪声模拟；PyTorch 可负责外推拟合和重采样误差分析。移到真机前，应核对替换门、折叠后实际保留的双比特门，以及应用与基准的交错执行顺序。

**2．线性分区把 Pauli 传播的全局去重改为局部任务**

*学界与研究机构 × 工程。补漏：11 月 12 日 18:43:30 UTC，即北京时间 11 月 13 日 02:43:30 提交的预印本；证据为经典模拟。*

Flatiron Institute、NYU 与 Columbia 的研究者用二元域上的线性哈希分配 Pauli 字符串。把字符串编码为比特向量 p，分区标签写成 Mp；乘以固定 Pauli 字符串 q 后，标签按 `M(p ⊕ q) = Mp ⊕ Mq` 更新。因此，一次 Pauli 旋转只需处理预先确定的分区配对，重复字符串的系数可在局部合并。一般 k 比特通道涉及的分区组至多有 4ᵏ 个成员。 [预印本与日期](https://arxiv.org/abs/2611.17262) · [表示与分区方法](https://arxiv.org/html/2611.17262v1#S2)

作者在 16×16 横场 Ising 模型的弱扩展测试中使用最多 32 个节点，每节点保留字符串预算固定；最大配置支持 1.6×10¹¹ 个字符串，去重和截断后的字符串存储约 10.5 TiB，总内存峰值约 28.8 TiB。该测试取 h/J = 3.04、20 个二阶 Trotter 步、JΔt = 0.1，规模增长通过增加总内存实现。 [测试条件与资源](https://arxiv.org/html/2611.17262v1#S3.SS2)

工程上可先用四比特线路比较“逐项传播后全局合并”与“线性分区后局部合并”，要求最终系数逐项一致，再测峰值内存和去重耗时。PennyLane 提供态矢量观测量参考，PyTorch 可用于小规模张量对照；论文的大规模吞吐由 Rust 实现与分布式内存支撑。已有 [paulistrings-rs 代码库](https://github.com/lkdvos/paulistrings-rs) 可供后续阅读，本期未执行其集群基准。

**3．喷注分类器完成小规模真机训练与测试**

*学界与研究机构 × 工程。补漏：11 月 12 日 10:45:24 UTC 提交的预印本，已投稿 EPJ Quantum Technology；含超导真机实验。*

INFN、Politecnico di Torino、INRiM 等合作者在五比特 IQM Lagrange 设备上运行重味喷注分类器的全部量子线路评估，经典损失、梯度计算和参数更新由 CPU 完成。输入来自 LHCb 的模拟开放数据，任务是区分 b 与 c 喷注。 [预印本与日期](https://arxiv.org/abs/2611.16607) · [硬件训练流程](https://arxiv.org/html/2611.16607v1#S3.SS1)

最终成本优化配置使用四个比特、一层变分线路、12 个参数、100 个训练样本、每次 256 shots 和 10 个训练 epoch；测试样本为 1,000 个。作者测得训练 QPU 时间约 43 分钟，真机与无噪模拟器各自训练后的 ROC AUC 均约 0.76。论文同时说明，在这些执行中 QPU 时间约占总墙钟时间的 20%—50%。这些数字对应压缩后的数据和模型，可作为规划小型训练循环的参考。 [配置表](https://arxiv.org/html/2611.16607v1#S2.T1) · [结果与计时口径](https://arxiv.org/html/2611.16607v1#S4)

用 PennyLane/PyTorch 迁移时，可先固定相同的数据划分与初始化，分别记录解析梯度、有限 shots 梯度和硬件训练的成本。Lagrange 为星形连接、原生 PRX/CZ 门，线路逻辑门数与编译后门数应分别保存。一次编译后绑定参数的工作流，也值得与逐次重编译的耗时比较。

**4．Caltech–Broadcom 近况把互连和编排列入扩展议题**

*学界与业界 × 工程与领域趋势。窗口内新公告：美国当地 11 月 13 日发布，北京时间 11 月 14 日 03:32。活动具体日期未在正文单列。*

Caltech 的官方报道介绍第三届 Caltech–Broadcom 技术研讨会。双方自 2023 年开始的五年合作已资助 26 位 Caltech 研究者，并包含设在 Ginsburg Center 的 Broadcom Quantum Laboratory。讨论涉及光子互连、异构处理器和复杂系统的软件编排。 [Caltech 官方报道](https://www.caltech.edu/about/news/caltech-and-broadcom-gather-to-map-the-quantum-future)

这是既有合作的近况。对算法工程的启示是把线路执行以外的接口纳入设计：经典计算与 QPU 间传输什么、哪些反馈需要低延迟、哪些作业可以批处理。研讨会提供了产业关注方向，具体吞吐和互连性能仍需技术指标与实验来评估。

**人物与团队动向**

IonQ 于美国当地 11 月 13 日宣布，现任 Commvault CFO Gary Merrill 获任公司 CFO，12 月初生效；前 Juniper Networks 首席会计官 Thomas A. Austin 获任新设的首席会计官，即时生效。Inder M. Singh 即时卸任其在公司的职务。公告给出了任职与生效安排，未说明离任动机。 [IonQ 官方公告](https://www.ionq.com/news/ionq-announces-executive-leadership-evolution)

**本期学习连接与优先行动**

先用一个单比特教学模型分离“噪声横轴是否准确”与“有限采样是否划算”。该模型检验 bnZNE 的核心思路，论文完整协议还需匹配原生门误差和随机化流程。

1. **建立可解析的噪声参考。** 应用态为 RY(π/3)|0⟩，理想 Z 期望值为 1/2；基准态为 |0⟩。两者分别经过同一通道 `Dη(ρ) = (1 − η)ρ + ηI/2`。令 ε 为基准测得 1 的概率，则 `ε = η/2`，应用观测量满足 `E = (1 − 2ε)/2`。用 η = 0.02、0.08、0.11 作为三个教学噪声档位。PennyLane 的 DepolarizingChannel 采用总 Pauli 错误概率参数，表达此通道应传入 3η/4。 [通道定义](https://docs.pennylane.ai/en/stable/code/api/pennylane.DepolarizingChannel.html)
2. **实现同预算采样与拟合。** PennyLane 用单比特密度矩阵获得精确概率，再产生有限 shots 的 Z 读出；PyTorch 用 float64 的最小二乘拟合截距。给三个档位标称标签 r = 1、3、5，分别按 r 和实测 ε 线性外推，同时保留最低噪声档的原始估计。每个方法每轮使用 3,000 shots：按 r 外推为每档 1,000；按 ε 外推为每档应用与基准各 500；原始估计集中在最低噪声档。20 轮、三种方法合计计划 180,000 次模拟读出，比较偏差、方差与均方误差。 [PyTorch 最小二乘](https://docs.pytorch.org/docs/2.15/generated/torch.linalg.lstsq.html)
3. **把横轴误差一起传播。** 基准 ε 本身由样本估计，应联合重采样应用与基准计数，报告截距区间。这个固定线路练习无需梯度优化；拟合区间和矩阵条件数比单次截距更有判断价值。后续增加独立读出误差，检验基准失配造成的偏差。
4. **再设计双比特门实验。** 选择二至四比特、线性连接的浅线路，并从后端编译结果构造基准。单个 CZ 的局部折叠可形成 1、3、5 个 CZ 的理想等价序列，需检查后续优化是否将其约掉；总门数、深度和采样预算按最终线路重算。真机接入需要可用账号、设备插件或线路导出路径、原生门支持和测量格式核对。

**趋势与验证状态**

本期技术补漏呈现同一条工程线索：经典模拟需要管理数据移动，误差缓解需要管理基准和统计量，变分训练需要管理整条执行循环。选择学习项目时，可固定一个可验证的输出，再逐层加入采样、编译与调度成本。

实际检索覆盖 arXiv quant-ph recent/new 及分页、Quantum、QFI、框架官方发布与文档、相关大学和公司官网。arXiv 返回最新为 11 月 13 日的刊列；Quantum 首页所列论文最新为 11 月 10 日；QFI 返回空刊列。本期三篇技术论文均按原始提交时间标为补漏，未计作窗口内首次发布。PennyLane 稳定版仍列 0.45.1、预发行 0.46.0b1，PyTorch 稳定版列 2.15.0，本窗口未核实到新版本。 [arXiv](https://arxiv.org/list/quant-ph/recent) · [Quantum](https://quantum-journal.org/) · [QFI](https://news.quantumclouds.cn/) · [PennyLane 发布](https://github.com/PennyLaneAI/pennylane/releases) · [PyTorch 发布](https://github.com/pytorch/pytorch/releases)

已用 NumPy 2.3.5 对上述单比特模型做确定性检查：Pauli 通道与 Dη 的参数换算、密度矩阵结果及 ε–E 关系均符合预设 10⁻¹² 阈值；精确 ε 的线性拟合截距与 1/2 相差约 2.22×10⁻¹⁶。PennyLane/PyTorch 执行、有限 shots 比较、训练、集群基准及 QPU 任务均未运行，行动部分为可行性方案。
