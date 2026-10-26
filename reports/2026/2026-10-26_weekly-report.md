---
issue_date: 2026-10-26
report_type: weekly-report
status: published
timezone: Asia/Shanghai
coverage_start: 2026-10-19
coverage_end: 2026-10-25
research_cutoff: "2026-10-26T09:22:27+08:00"
---

**量子算法工程师周报｜第002期**

刊期：2026 年 10 月 26 日｜报道周：北京时间 10 月 19 日 00:00—25 日 23:59:59｜检索截止：10 月 26 日 09:22:27｜阅读约 9—12 分钟

**本期优先关注：用同一相关函数比较线路、采样与经典后处理成本**

本周，StateDRIFT 按初态和观测目标优化随机演化，TQS 与 Floquet-ADAPT-VQE 的正式发表补充了利用对称性、周期性组织计算的方法。材料计算和纠错真机结果则展示了不同层次的验证条件。下一周优先完成一个两比特相关函数实验，把表示、演化、测量和后处理的误差逐项核对。

本期参考本周隔日简报，并补查 Google 编译竞赛及 ETH 控制器报道。新闻范围截至周日；周一的检索用于核验。10 月 19 日简报中发表于 16 日的校准、网络资助消息归入前周背景。

**1．问题结构正在改变模拟与测量的资源分配**

*学界、业界｜科学与工程；新增预印本与正式期刊发表，技术证据为理论和数值模拟。*

StateDRIFT 的新预印本于 10 月 22 日 UTC 提交。它让随机哈密顿量模拟的抽样分布依赖初态与目标可观测量，通过四阶展开优化估计偏差或方差，并控制展开截断误差。论文检验了精确初态信息、张量网络代理和经典阴影三种信息来源。工程收益需要同时计入这些信息的获取与分布优化成本。[论文及方法](https://arxiv.org/html/2610.31515v1)

两项正式发表进一步说明，减少线路开销可以从表示和测量方式入手：

| 本周进展 | 利用的结构与具体作用 | 实现时保留的条件 |
| --- | --- | --- |
| TQS，10 月 22 日发表于 Quantum | 宇称对称性使两组淬火、演化和测量恢复相关函数实部与虚部，省去辅助比特和受控演化 | 哈密顿量守恒宇称，初态具有确定宇称；相关算符满足反对易条件，淬火算符平方为 I；初态制备与谱反演另计 |
| Floquet-ADAPT-VQE，10 月 23 日发表于 Quantum | 辅助寄存器保存谐波，把周期驱动转为扩展空间的静态本征值问题；制备扩展本征态后，可用随时间保持固定深度的线路读取观测量 | 谐波截断、变分态制备和平方哈密顿量测量需收敛；恢复物理态的理想后选择成功率为 `2^(−nₐ)` |

来源：[TQS 正式发表](https://quantum-journal.org/papers/q-2026-10-22-2245/)、[公开方法稿](https://arxiv.org/html/2509.03288v4)；[Floquet 正式发表](https://quantum-journal.org/papers/q-2026-10-23-2247/)、[正式全文](https://quantum-journal.org/papers/q-2026-10-23-2247/pdf/)。两项工作的首版预印本分别始于 2025 年 9 月和 3 月，本周事件是期刊发表；TQS 的 v4 也在本周 10 月 19 日更新。

这三条路线分别调整抽样、测量协议和状态表示。周报的工程判断是：先固定所需输出及误差容限，再比较总成本。StateDRIFT 需要计入辅助信息的采样，TQS 需要计入初态与淬火操作，Floquet 方法需要计入扩展态制备及有效样本保留率。它们解决的任务与前提各有侧重，适合在同一小模型上逐步建立对照。

**2．真机应用与纠错结果，需要接到各自的完整流程上**

*学界、业界｜科学与工程；10 月 20 日应用预印本、既有真机数据重分析，以及 10 月 19 日纠错公告和公开技术稿。*

Bosch 与埃尔朗根—纽伦堡大学等研究者将量子杂质求解器接入 CaCuO₂ 的 DFT+DMFT 流程：经典求解器先完成自洽收敛，IBM Heron 随后重算最后一次杂质求解。模型有六个系统比特，Hadamard 测试另需一个辅助比特；变分演化线路预先在经典计算中训练。图 5 的线路含 65 个双比特门，每个时间点为 8,192 shots，校准及其他测量分量需另计。短时 Green 函数经拟合得到谱特征，残余幅度误差和时间偏移仍影响完整自洽迭代所需精度。[流程与真机结果](https://arxiv.org/html/2610.28231v1)

优化任务也显示了经典环节的作用。10 月 20 日 UTC 的另一篇预印本，对 Aquila 的 43 个既有最大独立集实例进行 Houdayer 簇交换后处理，不同最优解数量的放大倍数中位数为 24.3。该指标比较给定样本集合规模下的解多样性；论文尚缺廉价经典种子替代量子种子的对照。下一步应同时记录种子生成成本、后处理耗时和最终解覆盖率。[原始分析](https://arxiv.org/html/2610.28528v1)

Quantinuum 的彩色码实验则提供了逻辑层的两种资源指标：

| 真机测试 | 报告结果与统计口径 | 对算法实现的用途 |
| --- | --- | --- |
| d=7 存储，73 个物理比特，20 轮综合征提取 | Tesseract 解码下，每轮逻辑错误率约 `5×10⁻⁶`，68% Wilson 区间约 `[3,9]×10⁻⁶`；29,000 次实验有 3 次逻辑失败 | 估算指定纠错流程的存储可靠性，并保留稀少失败事件带来的区间宽度 |
| d=5 双逻辑比特随机基准测试 | 每个双逻辑比特 Clifford 的错误率约 `7×10⁻⁵`，68% 区间约 `[4,10]×10⁻⁵` | 估算该门集的执行质量；通用算法还需非 Clifford 资源及完整调度数据 |

来源：[公司 10 月 19 日公告](https://www.quantinuum.com/press-releases/quantinuum-breaks-error-correction-world-record-by-10x-validating-its-leading-path-to-fault-tolerant-quantum-computing-by-2029)、[技术稿与统计表](https://www.quantinuum.com/fault-tolerance-by-2029)。泄漏处理、中途测量、复位与经典解码都是实验流程的一部分。最低错误率对应指定解码器；实时部署还需同时比较解码质量和延迟。

这些证据提示一个共同的验证顺序：先确认子程序输出，再检查误差进入下一环节后的影响。谱峰是否稳定、最优解是否增加、逻辑错误如何累积，需要各自的参考与预算。TQS 对测量线路的简化可作为 Green 函数流程的候选组件，接入上述材料模型还需逐项核对算符分解、初态宇称与噪声影响。

**3．编译、模拟器和控制层都在要求明确的验证接口**

*学界、业界｜工程；本周软件基准预印本、开放竞赛公告与大学技术转化报道。*

Google Quantum AI 于 10 月 21 日宣布可验证量子线路编译竞赛，使用 Qualtran 中的 kickmix 库。三类基准涉及聚变模拟的相位函数、优化算法中的 Reed–Solomon 解码，以及量子化学的参数查表。每项提供基线与独立验证器，目标是在通过验证的条件下减少比特和门资源。其随机测试利用指定线路结构给出近似正确性的统计保证；应用时需保留验证器的误差和置信条件。[Google 原始公告](https://opensource.googleblog.com/2026/10/announcing-verifiable-quantum-circuit-compilation-competition-on-kaggle.html)

国内团队参与的 ArcTN 预印本于 10 月 22 日 UTC 提交，将收缩规划、切片与数值执行放在同一框架中。在 QC32 中八种配置均完成的 30 个网络上，Light 相对 Cotengra Auto/CMA-ES 的模型化 FLOPs 减少 61.32%，规划提速 1.62 倍。统计采用每实例五次运行的中位数和跨实例几何平均，各配置使用八个物理核及一小时外部限时。这个比较衡量收缩成本与规划耗时；总执行时间和峰值内存应一起测量。[方法与基准](https://arxiv.org/html/2610.31554v1)

ArcTN 团队包括 Arclight、HYGON、南京工业大学和中科院软件所研究者。[当前仓库](https://github.com/Quill-ArcLight/ArcTN)提供 Python 接口，完整 wheel 包含 Light/Heavy 引擎；公开源码与引擎采用分别列出的非商业许可。复现和工程选型需固定软件包、输出任务、搜索预算及许可条件。

ETH 于 10 月 20 日报道 Qendra 面向离子阱和中性原子开发控制系统，协调物理信号，并根据测量结果选择后续脉冲。报道将产品阶段描述为 MVP，已列出早期用户，规模化部署仍在推进。公司成立于今年 2 月；本周新增的是技术和团队现状披露。[ETH 原始报道](https://ethz.ch/en/news-and-events/eth-news/news/2026/10/spin-off-developing-conductors-for-quantum-computers.html)

这里可继续跟踪的长期方向是：线路优化器需要可检查的正确性接口，模拟器需要可重复的成本口径，控制器需要明确的测量反馈能力。对 PennyLane 工程，这些条件分别落在线路分解、设备执行语义和平台插件上；Python 调用接口之后，还需核对数据格式、原生操作与运行限制。

**人物与团队动向**

- **Zapata，10 月 20 日：** Peter Shor、Alexandru Paler、Simon Devitt 和 Artur Izmaylov 加入科学顾问委员会，职责涵盖科学技术方向及 Quantum Pilot 平台发展。公告列出其 MIT、阿尔托大学、悉尼科技大学和多伦多大学职务；本次披露的是新增顾问职责。[公司原始公告](https://investors.zapataquantum.com/news-releases/news-release-details/dr-peter-shor-anchors-prominent-group-quantum-scientists-joining)
- **Sparrow Quantum，10 月 22 日：** 创始人、原 Chief Quantum Officer Peter Lodahl 接任 CEO；Kurt Stokbro 转任 Executive Advisor 并留任董事会。公司将后续工作指向量子光源在更大计算系统中的集成、控制和连接。[公司原始公告](https://sparrowquantum.com/post/founder-peter-lodahl-appointed-ceo-to-lead-sparrow-quantums-next-phase-of-technical-development)
- **Qendra 的组织背景：** ETH 本周报道 Chidzahi Mabritto 已接任 CTO，Martin Stadler 专注 CEO 职责；报道未给出交接生效日期，后续可据原始公告跟踪。

**本期学习连接与优先行动：10 月 26—30 日**

优先完成 **同一两比特相关函数的精度与成本对照**。这是受本周方法启发的独立教学模型；原论文的材料、原子阵列及纠错结果对应各自更完整的复现任务。

取 ℏ=1，以 J 为能量单位、`1/J` 为时间单位，固定
`H/J=X₀X₁+0.7Y₀Y₁+0.4Z₀Z₁+0.3(Z₀+Z₁)`，初态为 `|00⟩`，宇称 `P=Z₀Z₁`。选择 `A=X₀、B=X₁`，本练习按 `C(t)=⟨00|B(t)A|00⟩` 固定相关函数的次序与虚部符号；哈密顿量守恒 P，A、B 均与 P 反对易。

| 阶段 | PennyLane／PyTorch 分工与验收输出 |
| --- | --- |
| 周一：建立独立参考 | PyTorch 用 4×4 复矩阵及 `matrix_exp(−iHt)` 计算 C(t)，固定比特张量顺序；检查厄米性、幺正性、宇称及 `C(0)=0`，保存参数与参考数组 |
| 周二：实现两组淬火测量 | 从初态分别施加 `U_R=exp(−iπY₀Z₁/4)`、`U_I=exp(+iπX₀/4)`，演化后测 B；两组均值分别给出 `Re C` 和 `−Im C`。先用解析期望值逐点核对，记录旋转角与符号 |
| 周三：比较演化近似 | 在同一时间网格比较一阶 Trotter 与普通 qDRIFT，逐步增加步数。随机演化先统计精确线路输出的偏差和轨迹方差；StateDRIFT 扩展需再实现论文分布目标、跨步骤项和截断有效性检查 |
| 周四：加入有限采样 | 在 `t=0,0.1,…,1`（单位 `1/J`）的 11 点，每组 S 次采样，TQS 基线为 `22S` shots；若每点每组使用 M 条随机轨迹、每条 S 次测量，则为 `22MS`，另计辅助信息及校准样本。PyTorch 统计误差与置信区间 |
| 周五：列出真机候选线路 | PennyLane 导出原生门分解和路由后深度；该两比特模型在相邻连接上可实现。按逐项两 CNOT 的分解，Trotter 每步三个双体 Pauli 旋转共六个 CNOT，实部淬火另加两个，编译后重新计数；记录每个设置的 shots、运行与后处理耗时 |

两条淬火恒等式可由初态的确定宇称直接核对：实部线路制备 `(|00⟩+A|00⟩)/√2`，虚部线路制备 `(|00⟩+iA|00⟩)/√2`；展开 B(t) 的期望值即可得到表中符号。PennyLane 负责线路和测量，PyTorch 负责独立矩阵计算与统计。[Torch 接口](https://docs.pennylane.ai/en/stable/introduction/interfaces/torch.html)、[矩阵指数文档](https://docs.pytorch.org/docs/2.14/generated/torch.linalg.matrix_exp.html)

这个固定参数练习以采样为主，加入变分压缩后再选择设备支持的梯度方法并统计梯度线路。进入真机前核对插件与账户、原生门、连接图、shots 和批处理限制；DMFT、Floquet 及纠错的迁移则分别补充辅助比特、态制备、动态控制和解码条件。

**来源覆盖与验证状态**

本期回读了本周简报，并重新获取 StateDRIFT、TQS、DMFT、MIS、ArcTN 的公开方法稿、Quantinuum 技术稿、期刊页面和机构／公司公告；Floquet 方法细节沿用上期已读取的正式全文，本轮复核期刊页和 RSS。Quantinuum 技术稿的同行评审状态尚未核实。文中的实现路线为可行性评估，淬火关系及资源算术已手工核对；本轮未执行量子模拟、框架复现、训练、谱拟合或真机任务。

- [arXiv quant-ph](https://arxiv.org/list/quant-ph/recent) 当前可见最近刊列覆盖 10 月 19—23 日；筛选和全文阅读为定向覆盖。[Quantum RSS](https://quantum-journal.org/feed/)及入选期刊页可访问。[QFI](https://news.quantumclouds.cn/)本轮返回 502，更新情况未能核实；国内技术覆盖主要来自 ArcTN，机构新闻仍有限。
- Google 编译竞赛及 Qendra 控制器信息均已追溯原始公告。周末汇总中的旧闻、仅有现职或月份的人事线索，未作为新任命加入。本周与前周事件按原始日期区分。
- 官方最新发布端点仍为 [PennyLane v0.45.1](https://github.com/PennyLaneAI/pennylane/releases/tag/v0.45.1) 和 [PyTorch v2.14.1](https://github.com/pytorch/pytorch/releases/tag/v2.14.1)，均早于本周；实际复现时需固定安装版本及设备插件。本周细项可参阅 [10 月 21 日简报](2026-10-21_every-other-day-brief.md)、[10 月 23 日简报](2026-10-23_every-other-day-brief.md)及 [10 月 25 日简报](2026-10-25_every-other-day-brief.md)。
