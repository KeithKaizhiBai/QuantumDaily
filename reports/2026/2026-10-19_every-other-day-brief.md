---
issue_date: 2026-10-19
report_type: every-other-day-brief
status: published
timezone: Asia/Shanghai
coverage_start: 2026-10-16
coverage_end: 2026-10-19
research_cutoff: "2026-10-19T09:05:40+08:00"
---

**量子算法工程师隔日简报｜第003期**

刊期：2026 年 10 月 19 日｜检索截止：北京时间 09:05:40｜阅读约 5—7 分钟

本期接续上期 10 月 16 日 17:18:31 的检索截止，报道窗口延长至今天上午。已核对的公开来源提供两条可确认发布于该窗口内的新公告，以及一条只标日期的截止日边界信息；据此采用较短篇幅。

**本期优先关注：建立读出校准与采样成本的可核对基线**

Quantum X Labs 公布三台 IBM 处理器上的校准测试结果，QuTech 获资助推进可编程量子网络集成。对算法实现而言，近期最有用的练习是把理想概率、测量混淆、有限采样和经典后处理分开验证，再用相同预算比较校准前后的误差。PennyLane 可承担线路模拟，PyTorch 可承担校准模型与统计分析。

**1．LayerQake 报告三台 IBM 设备校准后的测量偏差下降**

*业界｜工程；10 月 16 日 07:55 美国东部夏令时发布，即北京时间 19:55；公司自报真机测试。*

Quantum X Labs 称，其 QuantumQ Security 业务的 LayerQake 校准方法已在 `ibm_fez`、`ibm_kingston` 和 `ibm_marrakesh` 上测试。公告报告：各设备的“measurement bias”由约 11%—15% 降至 6% 以下，“maximum cumulative error”降低 15—21 倍。比较对象是公司测试中应用该方法前后的结果，证据层级为公司原始公告。[公司公告](https://investor.quantumxlabs.xyz/pressreleases/detail/6de3682d-7cf0-46de-a9d6-c426155fe182)、[带发布时间的公告分发页](https://www.globenewswire.com/news-release/2026/10/16/3382534/0/en/quantum-x-labs-cybersecurity-technology-achieves-significant-breakthrough-with-ibm-quantum-hardware.html)

这项消息与算法工程直接相关：相同线路在不同设备上产生的输出分布，会同时受到门误差、测量误差和采样涨落影响；校准的价值需要落实到目标可观测量的估计误差及总采样量。公告称测试经过预注册，但所读页面未提供预注册协议、完整线路集、比特规模、shots、指标数学定义和可运行代码的入口。因此，15—21 倍目前适用于公司所述测试口径，跨算法比较还需要这些实验材料。

**工程评估。** 适合先搭建公开、可检查的读出校准基线。设列随机矩阵 `A` 的元素 `A[y,x]` 表示实际准备计算基态 `x` 后读到 `y` 的概率，则理想分布与观测分布满足 `p_obs = A p`。通过独立校准样本估计 `A`，再从任务样本估计目标分布或可观测量。这个模型描述测量端的经典混淆；门误差可以另加噪声通道，分别观察其影响。

PennyLane 负责生成理想概率，或用 `default.mixed` 做带门噪声的密度矩阵模拟；PyTorch 负责读出通道、概率约束拟合和重采样统计。先固定线路，只拟合经典校准模型，便于把量子采样与经典优化的误差逐项核对。线路参数训练属于下一阶段：解析模拟可使用自动微分，有限 shots 的量子梯度则需选择设备支持的方法。[PennyLane 混态设备](https://docs.pennylane.ai/en/stable/code/api/pennylane.devices.DefaultMixed.html)、[Torch 接口](https://docs.pennylane.ai/en/stable/introduction/interfaces/torch.html)、[梯度配置条件](https://docs.pennylane.ai/en/stable/introduction/unsupported_gradients.html)

**2．QuTech 推进量子网络全栈集成，分布式算法需显式计入纠缠供应**

*学界、研究机构、业界｜科学与工程；官网发布时间为 10 月 16 日 12:21:20 UTC，即北京时间 20:21:20；资助与研发计划。*

QuTech 公布，Quantum Internet Alliance（QIA）获得欧盟委员会 4,750 万欧元资助，在未来三年半推进全栈量子互联网原型。联盟包含欧洲 50 多家机构，目标是用长距离光纤连接两个城域量子网络，将量子器件、控制、协议和应用软件集成到可编程系统。前一阶段工作覆盖 2022 年 10 月至 2026 年 3 月；本次公告的新增内容是下一阶段资助和集成目标。[QuTech 原始公告](https://qutech.nl/2026/10/16/qutech-coordinates-european-effort-to-build-worlds-first-full-stack-quantum-internet-prototype/)

这类系统对算法提出一个额外的资源问题：跨节点操作所需的纠缠对，需要经过生成、分发、等待和使用。算法的逻辑门数之外，还应记录纠缠生成成功率、等待时间、存储退相干、经典消息延迟及失败重试。公告中的可编程原型和开放测试设施属于研发目标，设备接入日期与可用接口仍待后续公告。

**工程评估。** 可用两个节点、每节点两个比特建立教学模型：PennyLane 描述局部门和给定纠缠资源下的量子态演化，PyTorch 记录随机等待时间、成功次数和最终可观测量。先把“已成功建立一对纠缠”的条件结果与“包含重试和等待”的平均成本分别统计。四比特密度矩阵有 256 个复数元素，适合小规模核对；更大的网络还需要专门的网络事件模拟。普通多比特模拟器可以验证条件线路，跨节点真机实验则需要网络平台实际提供纠缠分发和经典控制接口。

**3．UKRI 同时支持网络器件与技术人员培养，观察工程能力的投入结构**

*研究资助机构、业界｜工程与人才培养；公告标注 10 月 16 日，未提供精确发布时间，作为上期截止日的边界补充。*

UKRI 公告介绍了面向量子技术产品和培训的支持，其中明确列出 2,000 万英镑的量子网络企业投入，以及 QuEST Apprentices Programme 扩展的 800 万英镑，后者目标到 2030 年为 150 名工程学徒提供支持量子产业所需的技能。公告列举的具体应用以传感、成像和无线电系统为主；网络投入涉及激光器、光子芯片等器件与供应链。[UKRI 原始公告](https://www.ukri.org/news/ukri-backs-quantum-breakthroughs-supported-by-training/)

这些数字对应公告中的不同支持口径；项目之间的预算归属仍应以各资助项目文件为准。对算法工程师，它提供的趋势线索是：量子系统的交付同时依赖应用代码、器件集成、运行维护和技术人员。本期将其用于观察产业工程投入，算法效果仍需通过具体项目的任务与基准来评估。

**人物与团队动向**

本窗口已核查的公开来源中，暂无可确认的资深从业者新任职、跳槽或创办团队条目。QIA 公告列出 Stephanie Wehner 的联盟主任与 QuTech 教授身份，并列举 Carlos Errando-Herranz、Sophie Hermans 等参与研究组，可作为后续跟踪网络软件、集成光子与硬件工作的入口；这些是公告中的现有职责。

**本期趋势观察**

两条窗口内公告分别涉及设备输出的校准和网络组件的集成，UKRI 信息补充了器件及人员培养的投入。它们共同提示一个工程问题：从线路描述到可用结果，需要把数据质量、控制接口和运行成本纳入验证。这个观察来自本期少量公告，后续可跟踪公开协议、代码、设备接口以及端到端评测来检验其发展。

**本期学习连接与优先行动**

优先练习选 **两比特读出校准与 Bell 态测量**。这是受本期校准消息启发的独立基线练习，目标是学会核算误差与采样成本；LayerQake 的方法级复现需要公告之外的实验材料。

1. **建立独立参考。** 用 PennyLane 的 H、CNOT 准备 Bell 态 `(|00⟩+|11⟩)/√2`，与 PyTorch 中显式构造的四维态向量核对。先检查概率归一化以及 XX、YY、ZZ 的理想期望值分别为 1、−1、1。
2. **把校准与评估样本分开。** 在本地加入一个自行指定、记录完整参数的读出矩阵，用四个计算基态的样本估计 4×4 的 `A`。采用满足概率非负、总和为 1 的拟合，并检查矩阵条件数，观察采样噪声如何影响反演稳定性。PyTorch 负责拟合和 bootstrap；对真实设备的相关读出误差，张量积单比特模型需要单独验证。[PyTorch 自动微分文档](https://docs.pytorch.org/docs/2.14/autograd.html)
3. **核算测量与后处理成本。** 对 Bell 态测量 XX、YY、ZZ，并用 `(1 + ⟨XX⟩ − ⟨YY⟩ + ⟨ZZ⟩)/4` 估计对目标态的保真度。Z 基测量直接读取；X、Y 基测量分别加 H，以及 S† 后接 H。四个校准设置加三个任务设置，每设置 S 次采样，总计 7S；S=1,000 时是 7,000 次本地采样的预算示例。比较原始估计和校准估计的偏差、均方误差与区间覆盖，并把经典拟合耗时计入记录。
4. **核对真机映射。** Bell 态制备需要一条纠缠边；选相邻物理比特后，记录 CNOT 到设备原生纠缠门的分解、单比特旋转、实际双比特门数和深度。真机准备还包括账户与后端权限、PennyLane 设备插件或导出路径、shots 限制、校准时间戳和计数格式核对。先完成本地流程，再按明确预算安排设备测试。

完整 n 比特读出矩阵需要 2ⁿ 个校准输入和 4ⁿ 个矩阵元素，因此先用 2—4 比特验证流程最合适。固定 Clifford 线路的这项练习无需量子参数梯度；扩展到参数化线路后，再单独计入梯度测量开销。

**来源覆盖与验证状态**

本期实际检索并阅读了入选公司、QuTech 和 UKRI 的原始公告，检查了软件文档和发布记录。上述实现方案均为可行性评估；量子模拟、校准拟合、模型训练及真机任务均未执行。

- arXiv 的 recent 与 new 页面本次均显示最新刊列为 10 月 16 日；Quantum 首页与 RSS 最新论文仍是 10 月 15 日的 2237 号。访问结果限定了本轮可确认的更新范围。[arXiv recent](https://arxiv.org/list/quant-ph/recent)、[arXiv new](https://arxiv.org/list/quant-ph/new)、[Quantum 首页](https://quantum-journal.org/)、[Quantum RSS](https://quantum-journal.org/feed/)
- QFI 首页最新可见条目仍为 6 月 15 日。国内高校定向检索命中的“九章四号”原始校讯日期为 5 月 13 日；国内新增信息覆盖有限。[QFI](https://news.quantumclouds.cn/)、[中国科大原始校讯](https://news.ustc.edu.cn/info/1048/94930.htm)
- 已追溯的聚合线索中，蛋白水合位点论文正式发表于 9 月 21 日，10 月 16 日只更正致谢；Robert Wille 访谈页面发表于 10 月 17 日，正文注明录制于 2025 年 2 月。这两项均未列作本期新成果或人物变动。[论文及更正记录](https://journals.aps.org/prresearch/abstract/10.1103/gyqr-mv1h)、[访谈原文](https://thequantuminsider.com/2026/10/17/robert-wille-munich-quantum-software-company-quantum-software-needs-design-automation-not-just-algorithms/)
- 官方最新发布端点仍返回 PennyLane v0.45.1（6 月 26 日）和 PyTorch v2.14.1（9 月 30 日），均在窗口之前。文档用于方案设计，本地版本与兼容性尚未测试。[PennyLane 发布记录](https://github.com/PennyLaneAI/pennylane/releases/tag/v0.45.1)、[PyTorch 发布记录](https://github.com/pytorch/pytorch/releases/tag/v2.14.1)
