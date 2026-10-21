---
issue_date: 2026-10-21
report_type: every-other-day-brief
status: published
timezone: Asia/Shanghai
coverage_start: 2026-10-19
coverage_end: 2026-10-21
research_cutoff: "2026-10-21T17:29:33+08:00"
---

**量子算法工程师隔日简报｜第004期**

刊期：2026 年 10 月 21 日｜检索截止：北京时间 17:29:33｜阅读约 7—8 分钟

本期接续上期 10 月 19 日 09:05:40 的检索截止，报道窗口延长至今天下午。两篇新增预印本分别涉及优化样本后处理和材料计算；另补充两项只标注 10 月 19 日、精确发布时间待核的公告。

**本期优先关注：用簇交换扩展优化样本，并核算经典后处理的贡献**

一项新预印本用经典簇交换扩展中性原子设备采到的最大独立集，适合从小图穷举、样本去重和公平基线开始学习。本期同时关注 IBM 真机上的材料 Green 函数、Quantinuum 的纠错存储与逻辑门测试、NVIDIA 的含泄漏模拟，以及 Peter Shor 等人加入 Zapata 科学顾问委员会。

**1．Houdayer 簇交换扩展 Aquila 优化样本的解多样性**

*业界｜科学与工程；预印本于北京时间 10 月 21 日 01:03 提交；重分析既有真机测量数据。*

Andrew J. Ochoa、Martin J. A. Schuetz 和 Helmut G. Katzgraber 对 QuEra Aquila 的 43 个最大独立集（MIS）实例进行经典后处理，报告不同最优解数量的放大倍数中位数为 24.3，最高为 11,923。指标比较给定样本集合规模下的不同解数量，衡量的是解多样性；后处理耗时和量子采样成本需要另外统计。实例与测量数据来自既有 qReduMIS 研究。[预印本及提交记录](https://arxiv.org/abs/2610.28528)、[方法与结果](https://arxiv.org/html/2610.28528v1)

独立集要求任意两个被选顶点之间都没有边。给定两个合法解，先找出它们取值不同的顶点，再把这些顶点构成的子图分解成连通簇。各簇可以独立选择继承哪个父解：簇之间没有边，两个父解共同选中的顶点也与这些选择相容，因此交换后仍满足独立集约束。若有 c 个簇，一对父解最多产生 2ᶜ 个组合；再做贪心补点和去重，扩展候选池。

方法的可达范围取决于种子解覆盖了哪些区域。论文尚缺“用廉价经典近优解替代或混合量子种子”的对照，量子种子本身带来的额外价值仍待这个实验分离。对工程实践，最直接的问题是：固定采样预算后，多花多少 CPU 时间，能得到多少新的最优解？文末给出可独立验证的最小练习。论文指向的[数据仓库](https://github.com/jpmorganchase/qReduMIS)可作为后续数据入口；本轮核对了仓库说明，逐实例文件与预处理仍需在复现时检查。

**2．IBM Heron 上的 Green 函数进入真实材料 DMFT 流程**

*学界、业界｜科学与工程；北京时间 10 月 20 日 21:58 提交；预印本，包含真机实验。*

Bosch 与埃尔朗根—纽伦堡大学研究者针对 CaCuO₂，先用经典求解器收敛 DFT+DMFT 流程，再在 IBM Heron 的 `ibm_torino` 上重算最后一次杂质求解。模型包含一个杂质轨道和两个浴轨道，计入自旋后对应六个系统比特；Hadamard 测试另需一个辅助比特。研究用预先在经典态向量上训练的变分线路压缩时间演化，从短时 Green 函数拟合谱函数，分辨 Hubbard 带及准粒子峰。[预印本](https://arxiv.org/abs/2610.28231)、[流程、线路与真机结果](https://arxiv.org/html/2610.28231v1)

论文展示的压缩线路使用 65 个双比特门，图中每个时间点为 8,192 shots；完整预算还包括不同测量分量、校准线路和时间网格。残余幅度误差与时间偏移会影响谱拟合，作者据此指出完整 DMFT 自洽所需的精度仍超出现有测试能力。

**工程评估。** 六比特杂质模型适合先用精确对角化建立 Green 函数参考。PennyLane 负责变分演化及辅助比特测量线路，PyTorch 负责参数优化和谱拟合；先依次比较精确演化、压缩演化、有限采样和拟合误差。真机阶段再核对原生门分解、七比特布局、实际深度、校准开销及各测量设置的 shots。这个分解能定位误差是在时间演化还是经典反演中放大。

**3．Quantinuum 同时给出彩色码存储与双逻辑比特门的错误率**

*业界｜科学与工程；公司 10 月 19 日公告，作为日期边界补充；真机数据及配套公开技术稿。*

Quantinuum 在 Helios 离子阱处理器上测试码距 d=3、5、7 的三角彩色码。技术稿的存储实验准备六种逻辑 Pauli 本征态，执行 20 轮综合征提取，再测量和解码。d=7 时使用 73 个物理比特，Tesseract 解码得到每轮逻辑错误率约 5×10⁻⁶，68% Wilson 区间约为 [3,9]×10⁻⁶；该估计来自 29,000 次实验中的 3 次逻辑失败。码距每增加 2，拟合得到的错误抑制因子约为 12。[公司公告](https://www.quantinuum.com/press-releases/quantinuum-breaks-error-correction-world-record-by-10x-validating-its-leading-path-to-fault-tolerant-quantum-computing-by-2029)、[完整技术稿](https://www.quantinuum.com/fault-tolerance-by-2029)

另一组 d=3、5 的双逻辑比特随机基准测试，报告 d=5 时每个双逻辑比特 Clifford 的错误率约 7×10⁻⁵，68% 区间约为 [4,10]×10⁻⁵。将两类指标分别保留，才能把存储寿命和执行逻辑门的质量接到算法资源估算上。

实验结合光学回泵与 SWAP 泄漏消除，使离开计算子空间的布居返回可纠错范围。实现路线依赖中途测量、复位、综合征调度和经典解码；PennyLane 可从小码稳定子与理想测量练习起步，接入真机还需平台暴露这些控制能力。PyTorch 可用于神经解码器训练，但论文中的最低错误率首先应与其指定的 Tesseract 解码口径比较。

**4．NVIDIA 在 8,192 张 GPU 上模拟含泄漏的 104 比特协议**

*业界、研究机构｜工程；10 月 19 日公告和技术博客，作为日期边界补充；经典数值模拟。*

NVIDIA 与于利希研究者在 JUPITER 上模拟魔态制备：协议从码距 3 的彩色码增长到码距 7 的混合彩色码／表面码，并加入相干相位误差及部分位置的第三能级泄漏。104 是协议涉及的数据与辅助比特规模；模拟器通过重排操作、测量后复用存储以及三能级编码，将峰值存储压到 45 位编码寄存器。[原始公告](https://nvidianews.nvidia.com/news/nvidia-runs-record-simulation-of-fault-tolerant-quantum-computing-at-julich-supercomputing-centre)、[技术说明](https://nvidia.github.io/cuda-quantum/blogs/blog/2026/10/19/jupiter-magic-state-simulation/)

该寄存器约含 35.2 万亿个复振幅，双精度态向量占 512 TiB，即每张 GPU 约 64 GiB。这里的工程进展是利用协议结构管理实际存活的状态空间，并保留指定噪声模型。学习模拟器时，应一起记录物理对象数、局域能级数、峰值状态空间、精度和通信成本。PennyLane/PyTorch 的小规模练习可先比较二能级噪声与显式泄漏模型；实现第三能级需要支持相应希尔伯特空间和操作的模拟器。

**人物与团队动向：Peter Shor 等四人加入 Zapata 科学顾问委员会**

*学界、业界｜科学与工程；北京时间 10 月 20 日 19:00 发布；公开顾问任命。*

Zapata 宣布任命 Peter Shor、Alexandru Paler、Simon Devitt 和 Artur Izmaylov 为科学顾问委员会成员，职责包括指导科学技术方向及 Quantum Pilot 平台发展。公司公告列出的大学职务分别为 MIT 应用数学教授、阿尔托大学计算机科学副教授、悉尼科技大学教授兼 QSI 主任，以及多伦多大学理论与计算化学教授；Shor 的 MIT 职务另经[学校目录](https://math.mit.edu/directory/profile.html?pid=247)核对。[公司原始任命公告](https://investors.zapataquantum.com/news-releases/news-release-details/dr-peter-shor-anchors-prominent-group-quantum-scientists-joining)、[带精确时间的公司分发稿](https://www.globenewswire.com/news-release/2026/10/20/3384229/0/en/dr-peter-shor-anchors-prominent-group-of-quantum-scientists-joining-zapata-s-advisory-board.html)

本次公开变动是新增科学顾问职责。公告强调的能力包括算法基准、编译、纠错架构、资源估算与量子化学测量，提供了观察应用软件公司技术布局的具体线索。

**本期趋势观察**

本期几项工作都把量子子程序放进了更完整的处理链：优化需要样本后处理，材料计算需要时间演化与谱拟合，纠错需要泄漏处理和解码，模拟需要管理峰值状态空间。由此得到的工程判断是：复现计划应先画出量子和经典步骤的数据流，再为各步设置独立参考及成本记录。后续可跟踪公开数据、完整线路和端到端基准，检验这些组件对实际应用的贡献。

**本期学习连接与优先行动**

优先做一个 **8—12 顶点 MIS 簇交换练习**，从可穷举的独立基线开始，再考虑原论文数据。

1. **建立精确参考。** 固定单位圆盘图的坐标与连边半径，穷举全部 2ⁿ 个位串，找出最优大小和全部最优解。12 个顶点只有 4,096 个候选位串，适合逐项核对“独立”“极大”和“最大”这三个条件。
2. **固定种子与比较预算。** 用经典贪心法生成种子；另可用 PennyLane 的小型 QAOA 采样器生成一组种子，并明确这是教学替代模型。采用 `H = −Σ nᵢ + 2Σ_(i,j)∈E nᵢnⱼ`，其中 `nᵢ=(I−Zᵢ)/2`，E 是边集，基态对应 MIS。PyTorch 保存位串和频数，用 `torch.unique(..., dim=0, return_counts=True)` 统计不同解。[去重接口](https://docs.pytorch.org/docs/2.14/generated/torch.unique.html)
3. **核对交换与修复。** 先删除采样种子的冲突顶点，使其成为合法独立集，并记录修复造成的大小变化。用普通 Python 搜索差异子图的连通簇，枚举或限额抽样交换组合，再贪心补点。比较修复后的原始池、簇交换、相同 CPU 预算的经典局部搜索；记录独立性违规数、最优解数、最优流形覆盖率、候选生成数与耗时。各组使用相同种子规模，并分别报告种子生成成本。小图的精确参考负责验证全局最优性。
4. **列出门机与原子阵列的实现条件。** 门机基线的成本层可分解为单比特 Z 旋转和逐边 ZZ 旋转；逐个 ZZ 旋转采用两 CNOT 分解时，p 层在路由前为 `2p|E|` 个 CNOT，另加混合层与路由成本。全部目标位串在 Z 基采样。固定参数采样与离散后处理无需梯度；训练时用 PennyLane 的 Torch 接口和 PyTorch 优化器，另记梯度线路与 shots。[接口文档](https://docs.pennylane.ai/en/stable/introduction/interfaces/torch.html)

原论文的 Aquila 路线使用原子位置、Rydberg 阻塞和连续驱动，需要核对平台支持的几何、脉冲约束、账户权限与计数格式。固定已有测量池时，簇交换增加的是经典后处理成本；真机复测的新增采样预算须单独安排。

**来源覆盖与验证状态**

本期阅读了两篇入选预印本的方法与结果、Quantinuum 完整技术稿、NVIDIA 技术博客、Zapata 原始任命公告及 MIT 目录，并核对框架文档和发布记录。上述复现路线均为可行性评估；量子模拟、模型训练、谱拟合和真机任务均未执行。Quantinuum 配套稿的同行评审状态本轮未核实。

- [arXiv quant-ph](https://arxiv.org/list/quant-ph/recent) 列表已更新至 10 月 21 日；本轮重点筛查首屏标题并阅读入选论文。[Quantum](https://quantum-journal.org/) 已显示 10 月 20 日的 2238—2240 号论文，另读了其中[量子学习验证协议](https://quantum-journal.org/papers/q-2026-10-20-2239/)的摘要与介绍，作为理论方向补充。覆盖为定向筛选。
- [QFI](https://news.quantumclouds.cn/) 最新可见条目仍为 6 月 15 日；[中国科大量子研究部新闻页](https://quantum.ustc.edu.cn/web/news)本次所见首项内容涉及 8 月 24 日获奖公告。国内定向检索尚未核实本窗口内适合入选的新条目。
- 官方发布端点仍返回 [PennyLane v0.45.1](https://github.com/PennyLaneAI/pennylane/releases/tag/v0.45.1)（6 月 26 日）与 [PyTorch v2.14.1](https://github.com/pytorch/pytorch/releases/tag/v2.14.1)（9 月 30 日）。本期将其作为实现参考，具体本地依赖与设备插件兼容性待复现阶段检查。
