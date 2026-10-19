---
issue_date: 2026-10-19
report_type: weekly-report
status: published
timezone: Asia/Shanghai
coverage_start: 2026-10-12
coverage_end: 2026-10-18
research_cutoff: "2026-10-19T09:22:38+08:00"
---

**量子算法工程师周报｜第001期**

刊期：2026 年 10 月 19 日｜报道周：北京时间 10 月 12 日 00:00—18 日 23:59:59｜检索截止：10 月 19 日 09:22:38｜阅读约 9—12 分钟

**本期优先关注：把算法资源、验证条件与硬件成本连成一条证据链**

本周可逆线路搜索减少逻辑资源，魔法态培养的正式发表补充了非 Clifford 资源的真机证据，量子网络和应用团队则推进系统集成。下一周最值得完成的是一个小规模 MaxCut 工作流：从成本函数、连续演化和门分解开始，逐步加入采样与硬件约束，核对每一步的结果与成本。

本期按三个主题重新组织本周材料，并补查 Google 魔法态实验与 USC 任命公告。论文正式发表、首次预印本公开和机构披露分别标注；10 月 19 日的检索时间用于核验，新闻范围截至 18 日。

**1．算法设计减少两类开销：经典训练循环与可逆算术资源**

*SamBa-GQW：学界｜科学与工程；10 月 13 日正式发表于 Quantum，已有 2025 年预印本。LLM 可逆线路搜索：学界、业界｜科学与工程；10 月 15 日 UTC 提交，北京时间 16 日公开刊列；预印本。*

SamBa-GQW 用离线经典采样构造量子游走的时间调度，再运行固定的量子演化。作者在 MaxCut、最大独立集等问题上给出最高 30 比特的数值实验，并与优化过的 GQW、QAOA 比较。这项工作的本周进展是正式发表；数值结果与方法此前已通过预印本公开。[Quantum 论文](https://quantum-journal.org/papers/q-2026-10-13-2234/)、[论文 PDF](https://arxiv.org/pdf/2509.15138v3)

其机制可写为 `H(t) = Γ(t) H_M + H_C`：`H_C` 的对角元是待最小化的成本，`H_M` 连接候选解，`Γ(t)` 调节跃迁强度。作者通过采样候选解及其邻居的能量差来构造调度，减少反复调用量子线路以训练参数的需求。经典成本由采样数、每个候选的邻居数及成本函数计算量共同决定；量子成本则取决于总演化时间、调度插值和 Trotter 离散精度。论文采用两层时间划分，先描述分段调度，再细分每段做门级近似。谱隙和实例结构仍会影响所需演化与深度。

LLM 线路搜索优化的是另一类对象：执行指定经典函数的可逆量子子程序。作者让模型提出 Python 线路设计，由独立评估器检查并评分；八个任务中七个同时降低 Toffoli 门数与峰值比特数。评分使用二者乘积，比较基线按各任务规范确定。受控交换可以让多个分支共享算术模块；反计算时从当前寄存器恢复分支信息，可以减少保存历史的工作比特。[预印本及提交记录](https://arxiv.org/abs/2610.22367)、[设计与评估方法](https://arxiv.org/html/2610.22367v1)

两项工作的联系是**重新安排计算的表示与执行方式**：SamBa 将调度生成放到离线采样，可逆线路搜索则改变算术与中间信息的组织。它们的指标需要分别追踪：前者记录调度、演化、测量和求解质量，后者记录逻辑功能、相位、辅助位复位和门资源。完整应用的运行成本还要接上编译、纠错和设备执行数据。

**对 PennyLane／PyTorch 的实现判断。** SamBa 适合用 4—6 个变量先建立参考；PyTorch 计算分段矩阵指数和统计量，PennyLane 表达门线路。时间依赖 Hamiltonian 在不同时刻通常不对易，参考计算应保持时间顺序，并通过时间网格细化检查收敛。可逆算术则适合从 2 位加法开始，用独立整数参考和小规模态向量验证功能。两条路线都可以先固定结构；连续参数优化在需要时再接入 Torch QNode。[SamBa 作者仓库](https://github.com/ugo-nzongani/SamBa-GQW)、[可逆线路作者仓库](https://github.com/andigu/uncompute)

**2．容错证据同时衡量质量、保留率与验证开销**

*Google：业界、合作研究机构｜科学与工程；Science 标注 10 月 15 日正式发表，预印本首发于 2025 年 12 月 15 日。罕见事件模拟：国家实验室、学界、业界｜科学与工程；10 月 15 日正式发表于 Quantum，已有 2025 年预印本。SynDebug：学界、国家实验室｜工程；10 月 15 日 UTC 提交，作者注明将发表于 SIGOPS ATC 2026。*

Google 在 Willow 超导处理器上实验研究魔法态培养。Science 摘要报告，相对于未培养的状态，误差降低约 40 倍，后选择流程下给出的状态保真度至少为 0.9999(1)，保留约 8% 的尝试。该结果此前已公开预印本，本周新增的是同行评审发表和官方技术说明。[Science 论文摘要](https://www.science.org/doi/10.1126/science.aee7961)、[预印本及历史](https://arxiv.org/abs/2512.13908)、[Google 官方说明](https://blog.google/innovation-and-ai/models-and-research/quantum-computing/magic-state-cultivation-quantum-computing/)

魔法态为容错非 Clifford 操作提供可消耗资源。培养流程将有噪声的状态注入小码块，通过协调测量和错误检测筛选尝试，提高保留状态的质量。论文还研究了从码距 3 的色码向码距 5 的表面码转移状态。高保真度结果的 8% 保留口径包含逻辑制备与测量的筛选；按该口径，每个保留样本平均对应约 12.5 次尝试。这个换算是数据保留成本的工程估算，魔法态工厂的实际供给速度还需结合周期时间、并行度、存储和传输来评估。[实验预印本方法](https://arxiv.org/html/2512.13908v1)

这与主题一的逻辑资源直接相连：减少需要的非 Clifford 操作，可以降低资源需求；提高魔法态质量与有效供给，则改善资源供应。把 Toffoli 数换成物理比特和运行时间时，还需要指定门合成、纠错码和魔法态协议。论文中的逻辑门计数与实验中的保真度、保留率提供了不同层次的输入。

本周另两项工作帮助界定验证的对象：

| 工作 | 检查或估计什么 | 本周证据及关键条件 |
| --- | --- | --- |
| SynDebug | 编码程序的逻辑断言与运行开销 | 作者在所测码族、码距和工作负载的模拟中报告平均额外深度约 1.8%，多数案例为零；断言测量的影响取决于状态与观测量。 |
| 罕见事件模拟 | 给定纠错线路、解码器和门级噪声模型下的逻辑失败率 | splitting 方法研究低于 10⁻²⁰ 的模型失败率，在普通 Monte Carlo 可承受区域做对照；正文将链收敛与置信度量化列为待解决问题。 |

[SynDebug 记录](https://arxiv.org/abs/2610.22275)、[断言方法与模拟评估](https://arxiv.org/html/2610.22275v1)、[罕见事件模拟正式论文](https://quantum-journal.org/papers/q-2026-10-15-2237/)、[收敛与置信度讨论](https://arxiv.org/html/2509.13678v4)

**评价量的适用范围决定了证据如何进入应用判断。** Google 官方说明记录了一次实际基准问题：设备漂移与温度变化引起的噪声影响了原测量方法的有效性，团队据此增加控制并开发新的基准方案。断言通过支持某组逻辑不变量，低模型失败率支持给定噪声和解码配置，后选择保真度描述被保留的数据。应用判断需要把测试覆盖、噪声模型、接受率及总资源预算接起来。

优先在小规模线路上故意加入漏门、位序错误或读出误差，检查流程是否能发现它们，再扩展到编码工具。完整培养实验需要码块、重复综合征测量、筛选和解码；PennyLane 的小型噪声示例可用于理解机制，编码规模的复现应选择对应的专用工具与实验配置。

**3．量子系统集成把算法、纠错、控制与设备接口放到同一项目中**

*QIA：学界、研究机构、业界｜科学与工程，10 月 16 日公告。QuEra QC3：学界、国家实验室、业界｜工程与应用，10 月 15 日公告；计划本身于 3 月公布。*

QuTech 公布，Quantum Internet Alliance 获欧盟委员会 4,750 万欧元资助，在未来三年半推进全栈量子互联网原型。目标是通过长距离光纤连接两个城域量子网络，将器件、控制、协议和应用软件集成到可编程系统。公告还提出为未来试点和开放测试设施做准备。[QuTech 原始公告](https://qutech.nl/2026/10/16/qutech-coordinates-european-effort-to-build-worlds-first-full-stack-quantum-internet-prototype/)

同周，QuEra 公布参与 ARPA-E QC3 的三个团队，牵头单位分别为 Lawrence Berkeley National Laboratory、Lawrence Livermore National Laboratory 和 Phasecraft，研究方向涉及超导材料、磁体与制氢。公告明确了硬件方、算法方和应用对象的合作安排；资源目标与供应商路线图属于后续研发目标。[QuEra 项目公告](https://www.quera.com/press-releases/quera-scientists-named-co-principal-investigators-on-three-of-nine-teams-in-department-of-energys-quantum-chemistry-program-now-underway)

这两项进展使实现约束更加具体：分布式算法要等待和消耗跨节点纠缠，材料模拟要选择与算法相适应的逻辑编码、连接方式和测量策略。后续最有用的交付证据，是可使用的接口、控制能力、任务数据和资源估计。当前学习路线可以先把这些约束作为显式参数：PennyLane 处理条件线路与测量，PyTorch 处理统计和经典步骤；跨节点等待与重试则需要事件模型。真机接入以实际后端开放的门集、模拟控制或反馈接口为依据。

**人物与团队：本周披露的任命和实验平台迁移**

**Itay Hen 的 USC 电气与计算机工程研究副教授任命获校方介绍。** USC 10 月 14 日的新聘教师公告列出 Hen 的 Research Associate Professor 职位，并保留其 Information Sciences Institute 首席科学家身份；教师目录也确认这两项职责。其公开研究方向包括量子多体模拟算法、量子计算基准，以及数字和模拟量子计算。公告介绍的是本年度任命，未列具体生效日。可持续跟踪其团队的模拟方法、基准与项目成果。[USC 新聘公告](https://viterbischool.usc.edu/news/2026/10/six-new-faculty-join-usc-stevens-school-of-computing-and-ai-this-year/)、[校方教师目录](https://viterbi.usc.edu/directory/faculty/Hen/Itay)

**QuTech 的开放微腔平台转入 KIT 的 Tina Müller 新团队。** 10 月 13 日机构报道说明，Hanson Lab 的相关研究线结束后，团队将完整装置及控制代码迁到 KIT；重新安装后一周内完成降温和振动测试，初步性能与 Delft 相近。该动态记录了实验能力与研究线的延续，Müller 任职生效日仍未在这篇报道中给出。[QuTech 平台迁移报道](https://qutech.nl/2026/10/13/a-quantum-setup-moves-from-delft-to-karlsruhe/)

这两项公开信息分别体现了研究职责的扩展和实验平台的移交。人物后续观察以论文、代码、项目与团队建设为依据。

**下一周行动清单：先完成一个 4 比特 MaxCut 工作流**

建议主任务选 SamBa 的小实例，贯通本周三个主题。先固定无权四环图，令成本为割边数的相反数，枚举全部 16 个比特串核对最小成本 −4；使用统一的无量纲代价和时间约定。保持同一实例、位序、调度及数据记录，逐层加入近似。

| 阶段 | PennyLane／PyTorch 分工 | 应交付的检查结果 |
| --- | --- | --- |
| 第 1 天：成本与调度 | PyTorch 建立成本对角矩阵和 X 混合 Hamiltonian；依据作者 Sampler、Builder 核对调度。 | 位序、代价符号、最优比特串、采样设置与调度参数记录。 |
| 第 2 天：演化与线路 | PyTorch 按时间顺序计算细分段矩阵指数；PennyLane 表达对应 Trotter 线路。 | 网格细化曲线、态保真度、概率分布差异与最优解概率。 |
| 第 3 天：有限采样 | PennyLane 生成计算基样本；PyTorch 估计期望成本、命中率和重复运行差异。 | 采样次数与统计误差的关系，以及经典采样、演化、后处理的分别耗时。 |
| 第 4 天：故障与对照 | 加入一处代价符号或位序错误，再测试一组明确参数的噪声。 | 检查流程发现错误的证据；用相同任务与测量预算组织 QAOA 小对照。 |
| 第 5 天：设备映射 | 对目标拓扑分解线路，检查权限、插件或导出路径、计数格式及费用。 | 原生门数、双比特门深度、SWAP 开销与候选采样预算，据此决定后续设备实验。 |

PyTorch 的 `torch.linalg.matrix_exp` 可计算每个固定 Hamiltonian 时间片的指数。通过进一步细化参考网格，可以区分参考时间离散误差与门乘积近似误差。四比特状态向量有 16 个复数分量，稠密 Hamiltonian 有 256 个元素，适合本地核对。[PyTorch 矩阵指数文档](https://docs.pytorch.org/docs/2.14/generated/torch.linalg.matrix_exp.html)

四环图每层有四个 ZZ 成本项。若逐项采用 CNOT—RZ—CNOT 分解，优化和路由前每层需要 8 个 CNOT，另有单比特混合旋转；目标拓扑决定额外路由和可并行程度。成本与命中率都可从同一组计算基样本提取。SamBa 的固定调度部分无需参数梯度；QAOA 对照若训练参数，使用 Torch QNode 和 PyTorch 优化器，并按实际生成的梯度线路统计测量开销。[PennyLane Torch 接口](https://docs.pennylane.ai/en/stable/introduction/interfaces/torch.html)

这份清单是下一周的实施建议。完成小实例后，再决定扩到六比特、加入读出校准或开展可逆加法验证；规模、模型与预算随明确目标逐项增加。

**来源覆盖、补漏与验证状态**

本期参考 [10 月 14 日样稿](2026-10-14_every-other-day-brief.md)、[10 月 16 日简报](2026-10-16_every-other-day-brief.md) 和 [10 月 19 日简报](2026-10-19_every-other-day-brief.md)，重新阅读相关论文与机构材料，并补入 Google 正式发表及 USC 任命披露。实现分析、12.5 次尝试的换算、最小示例的门数与行动表均属工程评估；本期未执行量子模拟、训练、论文独立复现或真机任务。

- 论文核验覆盖 SamBa PDF 的方法与实现部分、LLM 搜索、SynDebug、罕见事件与魔法态实验的相关预印本正文。Google 正式版本核验了 Science 摘要与元数据，方法说明还参考其官方文章和公开预印本；本期未核验 Science 付费正文的全部内容。
- arXiv recent 本次最新刊列仍为 10 月 16 日；本轮检查首页及定向入选论文。Quantum 首页最新论文仍为 10 月 15 日；QFI 最新可见条目仍为 6 月 15 日。国内高校定向检索命中多条旧进展和活动信息，本期国内新增报道覆盖有限。[arXiv](https://arxiv.org/list/quant-ph/recent)、[Quantum](https://quantum-journal.org/)、[QFI](https://news.quantumclouds.cn/)
- 一条 10 月 17 日的 Kipu 毒性分类聚合报道追溯至公司原始技术文章，其元数据日期为 7 月 10 日，作为窗口外背景保留，未计入本周新结果。读出校准公司的测试口径与材料缺口已在 19 日简报说明，本周综合判断优先使用论文证据。[Kipu 原始文章](https://kipu-quantum.com/blog/reading-toxicity-of-molecules-with-neutral-atom-quantum-processors)
- 官方最新发布端点返回 PennyLane v0.45.1（6 月 26 日）和 PyTorch v2.14.1（9 月 30 日），均在报道周之前。文档用于可行性设计，本地安装与版本兼容性尚未测试。[PennyLane 发布记录](https://github.com/PennyLaneAI/pennylane/releases/tag/v0.45.1)、[PyTorch 发布记录](https://github.com/pytorch/pytorch/releases/tag/v2.14.1)
