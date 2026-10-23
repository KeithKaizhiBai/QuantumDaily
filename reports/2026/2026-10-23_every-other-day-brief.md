---
issue_date: 2026-10-23
report_type: every-other-day-brief
status: published
timezone: Asia/Shanghai
coverage_start: 2026-10-21
coverage_end: 2026-10-23
research_cutoff: "2026-10-23T17:26:15+08:00"
---

**量子算法工程师隔日简报｜第005期**

刊期：2026 年 10 月 23 日｜检索截止：北京时间 17:26:15｜阅读约 6—8 分钟

本期接续 10 月 21 日 17:29:33 的检索截止，报道窗口延长至今天下午。入选内容包括两篇新增预印本、一项正式期刊发表和一项公司领导层变动。

**本期优先关注：把随机演化的偏差、轨迹方差和测量成本分别核算**

StateDRIFT 利用初态和目标可观测量调整随机哈密顿量模拟的采样分布，适合从两比特精确参考开始学习。本期同时关注 ArcTN 的收缩规划、利用宇称对称性的 Green 函数测量，以及 Sparrow Quantum 创始人 Peter Lodahl 接任 CEO。

**1．StateDRIFT 按初态与观测目标分配随机演化步骤**

*学界、业界｜科学与工程；北京时间 10 月 23 日 00:29 提交；预印本，证据为数值模拟。*

Fujitsu Research of Europe 与合作高校研究者提出 StateDRIFT，在晶格及分子模型的短时动力学中检验了按任务调整随机演化分布的方法，分子测试规模为 6—18 比特。目标是以较低偏差和方差估计演化后的期望值，减少达到指定精度所需的线路资源。[预印本与提交时间](https://arxiv.org/abs/2610.31515)、[方法及数值结果](https://arxiv.org/html/2610.31515v1)

对 `H=ΣⱼcⱼPⱼ`，普通 qDRIFT 按系数绝对值分配概率；Pⱼ 是 Pauli 字符串。StateDRIFT 还利用初态对各项的响应、目标可观测量及相关对易子来选择概率。概率 qⱼ 改变时，每步演化同步改为 `exp[−icⱼTPⱼ/(Nqⱼ)]`，其中 T 是总演化时间，N 是随机步骤数，从而保留对同一哈密顿量的模拟目标。

方法用四阶截断表达式优化偏差或方差，并检查截断的有效性。基准先采用精确初态信息，再测试矩阵乘积态代理和经典阴影估计这些信息的路线。实际收益取决于演化时间、初态、观测目标，以及获取辅助信息和优化分布的成本；这些步骤需要进入端到端预算。作者使用的 [OpenQARP](https://github.com/OpenQARP/openqarp) 是复现入口之一，本轮已核对仓库说明。

**工程评估。** 先把每条随机线路的精确期望值作为输出，区分随机编译的系统偏差与轨迹间方差，再加入有限 shots。PennyLane 描述 Pauli 旋转和测量，PyTorch 建立精确演化参考并统计误差。文末的单步练习可以验证这一分解；论文的多步分布还包含跨步骤响应项，需要进一步实现其目标函数及有效性检查。

**2．ArcTN 同时优化张量网络的收缩成本与规划耗时**

*学界、业界｜工程；北京时间 10 月 23 日 00:58 提交；预印本，经典模拟工具基准。*

ArcTN 团队来自 Arclight Quantum Computing、HYGON、南京工业大学和中科院软件所。框架结合随机贪心构造、子树重配置和平行回火搜索，提供侧重低规划开销的 Light 与加强搜索的 Heavy，并通过切片控制中间张量大小。[预印本](https://arxiv.org/abs/2610.31554)、[实现与基准方法](https://arxiv.org/html/2610.31554v1)

在 QC32 中八种配置均完成的 30 个网络上，Light 相对 Cotengra Auto/CMA-ES 的模型化收缩 FLOPs 减少 61.32%，规划提速 1.62 倍。统计先取每实例五次运行的中位数，再跨实例取几何平均；各配置使用八个物理核和一小时外部限时。这里的规划时间截至返回收缩顺序，数值执行耗时另行测量。两个未被所有配置完成的网络被排除在该组比较之外。

收缩顺序决定哪些指标先求和，因而改变运算量与中间存储。切片把部分指标固定后拆成多个较小任务，以额外计算换取内存空间。对模拟工作，比较时应固定请求的是单个振幅、期望值还是完整态，并同时记录规划、执行和峰值存储。

**工程评估。** 可先用 4—8 比特线路，将同一输出分别交给 PennyLane 态向量参考和张量收缩验证。PyTorch 可提供独立张量计算；需要梯度时，应按固定路径用可微算子重新执行并核对梯度连接。当前[仓库说明](https://github.com/Quill-ArcLight/ArcTN)提供 CPU 收缩及 Python 接口，完整 wheel 包含专有 Light/Heavy 引擎，公开源码与引擎均注明非商业许可。复现其规划结果需记录 wheel、预设、随机设置和停止条件；`target_size` 限制的是单片中间张量元素数，进程总内存还包括其他存活张量及工作空间。

**3．宇称对称性把 Green 函数测量转化为两组淬火实验**

*学界｜科学与工程；10 月 22 日正式发表于 Quantum；理论协议与数值验证。*

Changhao Yi 和 Cunlu Zhou 的工作正式发表于 Quantum。其 tailored quench spectroscopy（TQS）利用宇称对称性，通过制备两种受扰初态、进行原生时间演化并测量目标算符，重建时间相关函数的实部和虚部。对应测量线路可以省去辅助比特和受控时间演化。[期刊论文](https://quantum-journal.org/papers/q-2026-10-22-2245/)、[公开方法稿](https://arxiv.org/html/2509.03288v4)

两组实验的简化有明确条件：哈密顿量守恒宇称 P，初态处于已知宇称扇区；相关函数的两个测量算符均与 P 反对易，其中淬火算符 A 满足 `A²=I`。对混合宇称的热态，协议另需宇称分辨的态制备与组合。文中包含 2×3 Fermi–Hubbard 模型、12 个自旋轨道的数值示例，并考察 Trotter 演化及初态混合扰动。

**工程评估。** 先在四比特、守恒宇称的小自旋模型上，用 PyTorch 矩阵演化直接计算相关函数，再以 PennyLane 实现两组淬火测量。核对宇称、旋转符号、Trotter 步数和有限采样后，才进入谱重建；观测时长与时间步距也需记录。真机成本还包括初态制备、可能含长 Pauli 字符串的淬火门分解、路由和各时间点测量。作者提供 [TQS 仓库](https://github.com/CYI1995/TQS)入口；本轮所读 README 仅含项目名，运行说明仍待进一步检查。

该研究的预印本始于 2025 年 9 月 3 日，v4 于今年 10 月 19 日更新；本期新增事件是正式发表。[版本记录](https://arxiv.org/abs/2509.03288v4)

**人物与团队动向：Sparrow Quantum 创始人 Peter Lodahl 接任 CEO**

*业界｜工程；10 月 22 日公司原始公告，领导层交接。*

Sparrow Quantum 宣布，创始人、原 Chief Quantum Officer、教授 Peter Lodahl 已被任命为 CEO，接替 Kurt Stokbro；Stokbro 将担任 Executive Advisor，并继续留任董事会。公司将下一阶段工作描述为把已交付的量子光子芯片进一步集成、控制并连接到更大的计算系统中。[公司任命公告](https://sparrowquantum.com/post/founder-peter-lodahl-appointed-ceo-to-lead-sparrow-quantums-next-phase-of-technical-development)

公告还介绍了新设科学顾问委员会，并列出 Mark Saffman 为创始成员。这里可核实的变动是公司职责与顾问组织安排；后续技术跟踪可聚焦光源、控制和系统互联的公开里程碑。

**本期趋势观察**

StateDRIFT 利用初态与观测目标减少随机演化成本，ArcTN 根据网络结构和请求输出安排计算，TQS 则用对称性简化测量。它们共同给出一个有用的工程方向：在选择模拟器或编译线路前，先明确输入态、需要的输出及可用结构。Sparrow 的交接公告补充了系统集成的产业视角。这个判断来自本期几项工作，后续应通过相同任务、精度和总预算下的端到端比较来检验。

**本期学习连接与优先行动**

优先完成 **StateDRIFT 的两比特单步基线**，目标是把偏差、轨迹方差和测量噪声分别看清。

1. **固定问题和独立参考。** 取 ℏ=1，选定能量单位，以对应逆能量为时间单位。使用 `H=3Z₀Z₁+X₀+X₁`、`O=Z₀+Z₁`、`T=0.2`，初态由两个 `RY(π/4)` 制备。PyTorch 用 4×4 复矩阵及 `matrix_exp(−iHT)` 计算精确参考，明确两个比特的张量顺序。[矩阵指数文档](https://docs.pytorch.org/docs/2.14/generated/torch.linalg.matrix_exp.html)
2. **比较两个概率分布。** 对 `(Z₀Z₁,X₀,X₁)`，普通 qDRIFT 概率为 `(0.6,0.2,0.2)`。采用论文由单步小角度展开得到的响应权重 `(0,0.5,0.5)`，混入 20% 的普通分布后，得到严格正的 `(0.12,0.44,0.44)`。对每个抽中项施加 `exp(−icⱼTPⱼ/qⱼ)`。先穷举三种单步线路，按概率计算均值与方差，以精确参考检查它在 T=0.2 下的效果，再用独立随机轨迹抽样核对。该练习检验特定单步规则，多步推广需加入论文中的跨步骤项。
3. **拆开两层采样。** 先用精确线路期望值，比较偏差 B、轨迹方差 V，以及 M 条独立轨迹均值的 `MSE=B²+V/M`。再让每条线路取 S 次测量，单独估计条件测量方差；此时任务采样量为 MS，辅助信息的测量另计。增加 M 可以降低随机均值的方差，系统偏差则通过改变分布或演化近似来处理。
4. **记录线路与接入成本。** PennyLane 实现 Pauli 旋转，PyTorch 管理参考值和误差统计；固定分布的本练习无需量子参数梯度。[Torch 接口](https://docs.pennylane.ai/en/stable/introduction/interfaces/torch.html)可用于后续可微模型。按 [Pauli 旋转定义](https://docs.pennylane.ai/en/stable/code/api/pennylane.PauliRot.html)，`exp(−iθP)` 对应的旋转角为 `2θ`；相邻比特上的 ZZ 项可采用两 CNOT 加 RZ，X 项是单比特门，O 的两个分量可在同一 Z 基测量。逐条统计实际 ZZ 次数、总双比特门数及深度；真机接入前核对设备插件、原生门、布局、shots 限制和批处理方式。

先用这个四维状态空间验证误差分解，再扩展到少量比特和多步演化。分布优化、初态信息获取及经典处理耗时，与量子采样一并记录，才能判断整体收益。

**来源覆盖与验证状态**

本期阅读了 StateDRIFT、ArcTN 及 TQS 的相关方法和结果章节，核对了期刊摘要、软件仓库说明、官方框架文档及 Sparrow 任命公告。复现路线为可行性评估；量子模拟、模型训练、谱重建和真机任务均未执行。

- [arXiv quant-ph](https://arxiv.org/list/quant-ph/recent) 已列至 10 月 23 日；本轮筛查当天首屏 50 条及[10 月 22 日刊列](https://arxiv.org/list/quant-ph/recent?skip=65&show=100)的标题，重点阅读入选论文。[Quantum](https://quantum-journal.org/) 显示 10 月 22 日新论文；TQS 的方法核验采用期刊摘要及作者公开 v4。来源覆盖为定向筛选。
- [QFI](https://news.quantumclouds.cn/) 最新可见条目仍为 6 月 15 日。另阅读了[田纳西大学量子研究综述](https://research.utk.edu/2026/10/22/building-the-quantum-future-inside-uts-innovation-ecosystem/)，作为研究生态背景。国内团队的本期技术信息主要来自 ArcTN 预印本及仓库，机构新闻覆盖仍有限。
- 10 月 22 日的[Quantinuum 云合作更新](https://www.quantinuum.com/blog/quantinuum-and-oracle-advance-hybrid-quantum-ai-computing-with-early-access-to-helios)追溯到 [Oracle 10 月 14 日早期访问公告](https://blogs.oracle.com/ai-and-datascience/explore-quantum-computing-oracle-free-preview)，本期将其留作背景。官方最新发布端点仍为 [PennyLane v0.45.1](https://github.com/PennyLaneAI/pennylane/releases/tag/v0.45.1) 与 [PyTorch v2.14.1](https://github.com/pytorch/pytorch/releases/tag/v2.14.1)，均早于本窗口；本地依赖和插件兼容性待复现时检查。
