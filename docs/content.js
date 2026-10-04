const PAGES = [
  { id: "start", nav: "从这里开始" },
  { id: "quickstart", nav: "快速开始" },
  { id: "install", nav: "按工具安装" },
  { id: "modes", nav: "强度档位" },
  { id: "commands", nav: "命令" },
  { id: "ladder", nav: "决策阶梯" },
  { id: "config", nav: "配置" },
  { id: "uninstall", nav: "卸载" },
  { id: "faq", nav: "常见问题" },
];

const HTML = {
  start: `
    <p class="kicker">线上使用指导</p>
    <h1>Ponytail 使用指南</h1>
    <p class="lede">Ponytail 是给 AI 编程助手用的技能。它逼助手走<strong>又懒又正确</strong>的路：不该存在的功能直接跳过，仓库里已有的先复用，再写最短的 diff；校验、安全、无障碍不能砍。</p>
    <div class="cards">
      <a class="card" href="#quickstart"><strong>五分钟上手</strong><span>选 Cursor、Claude Code 或 Codex 即可。</span></a>
      <a class="card" href="#install"><strong>按你的工具装</strong><span>十余种宿主的复制粘贴安装。</span></a>
      <a class="card" href="#commands"><strong>日常命令</strong><span>调强度、审膨胀、收回「以后再说」。</span></a>
    </div>
    <h2>装好之后你该看到什么</h2>
    <ol>
      <li>新会话默认是 <code>full</code>（除非你改过默认档）。</li>
      <li>写代码时，浏览器已有 <code>&lt;input type="date"&gt;</code> 或标准库能做的，不会再装一套组件库。</li>
      <li>仓库脚手架泛滥时，输入 <code>/ponytail ultra</code>（Cursor hooks 下当普通消息发即可）。</li>
    </ol>
    <p class="note">安装命令以官方仓库为准：<a href="https://github.com/DietrichGebert/ponytail">github.com/DietrichGebert/ponytail</a>。本指南依据上游 v4.10.3 的实际安装与命令整理。</p>
  `,
  quickstart: `
    <h1>快速开始</h1>
    <p>下面三条路<strong>选一条</strong>即可。Claude Code、Codex、Cursor hooks 需要 PATH 上有 Node（没有的话技能仍可用，只是 hook 会报无害的 <code>node: command not found</code>）。Nix / nvm 用户：Node 必须出现在<strong>非交互 shell</strong> 的 PATH 里。</p>
    <h2>A. Cursor（本编辑器）</h2>
    <p>Hooks 会在会话开始和切换档位时注入规则。云端 agent 不会触发 <code>sessionStart</code>；子 agent 拿不到规则集。</p>
    <pre><code>git clone https://github.com/DietrichGebert/ponytail
node ponytail/scripts/cursor-hooks.js install</code></pre>
    <p>克隆目录不要随便挪（hooks 会调用其中的脚本）。打开<strong>新</strong>对话，把下面当普通消息发出：</p>
    <pre><code>/ponytail
/ponytail lite
/ponytail full
/ponytail ultra
/ponytail off</code></pre>
    <p>若工作区已有 <code>.cursor/rules/ponytail.mdc</code>，hooks 会让路。想让 hooks 管档位，删掉那条 rule。</p>
    <p>仅当前项目：</p>
    <pre><code>node ponytail/scripts/cursor-hooks.js install --project</code></pre>
    <h2>B. Claude Code</h2>
    <p>必须分成<strong>两条</strong>独立提示发送：</p>
    <pre><code>/plugin marketplace add DietrichGebert/ponytail</code></pre>
    <pre><code>/plugin install ponytail@ponytail</code></pre>
    <p>桌面版：在 Code 标签里输入这两条，或点 <strong>+</strong> → Plugins → Add plugin。侧栏 Customize 里可以管理 marketplace。</p>
    <h2>C. Codex</h2>
    <pre><code>codex plugin marketplace add DietrichGebert/ponytail
codex plugin add ponytail@ponytail</code></pre>
    <p>然后打开 <code>/hooks</code>，信任两条生命周期 hook，再开新线程。桌面版装完要重启。Codex 里技能用 <code>$ponytail-review</code> 这种形式。</p>
    <h2>自检</h2>
    <ol>
      <li>让它做日期选择器：应得到原生 <code>&lt;input type="date"&gt;</code>，而不是新 npm 包。</li>
      <li>在支持技能的宿主运行 <code>/ponytail-help</code>；Cursor hooks 下发 <code>/ponytail</code> 查看当前档位。</li>
    </ol>
  `,
  install: `
    <h1>按工具安装</h1>
    <p>插件宿主有档位切换，多数还有 hooks。仅指令宿主只能靠复制规则文件，没有 <code>/ponytail</code> 档位命令。</p>
    <h2>GitHub Copilot CLI</h2>
    <pre><code>copilot plugin marketplace add DietrichGebert/ponytail
copilot plugin install ponytail@ponytail</code></pre>
    <p>交互式等价命令：先 <code>/plugin marketplace add DietrichGebert/ponytail</code>，再 <code>/plugin install ponytail@ponytail</code>。命令带插件名前缀：</p>
    <pre><code>/ponytail:ponytail ultra
/ponytail:ponytail-review</code></pre>
    <h2>OpenCode 2</h2>
    <p>写入 <code>opencode.json</code>：</p>
    <pre><code>{ "plugins": ["@dietrichgebert/ponytail"] }</code></pre>
    <p>从本地仓库引用时，必须是<strong>目录</strong>：<code>{ "plugins": ["./.opencode/plugins"] }</code>。不要写成 <code>ponytail.mjs</code> 文件路径，OpenCode 2 会拒绝。OpenCode 1 用旧键 <code>plugin</code>，并指向 <code>ponytail.mjs</code> 文件。</p>
    <h2>Gemini CLI / Antigravity</h2>
    <pre><code>gemini extensions install https://github.com/DietrichGebert/ponytail
agy plugin install https://github.com/DietrichGebert/ponytail</code></pre>
    <p>Antigravity 会把 <code>/ponytail</code> 命令转成技能，在对话里当消息输入（例如直接发 <code>/ponytail-review</code>），而不是从斜杠菜单点选。</p>
    <h2>其他插件安装</h2>
    <table>
      <thead><tr><th>宿主</th><th>命令</th></tr></thead>
      <tbody>
        <tr><td>Pi</td><td><code>pi install git:github.com/DietrichGebert/ponytail</code></td></tr>
        <tr><td>Hermes</td><td><code>hermes plugins install DietrichGebert/ponytail --enable</code>，然后重启</td></tr>
        <tr><td>Devin CLI</td><td><code>devin plugins install DietrichGebert/ponytail</code></td></tr>
        <tr><td>Grok Build</td><td><code>grok plugin install DietrichGebert/ponytail --trust</code>，再在 <code>/plugins</code> 或 <code>~/.grok/config.toml</code> 启用（默认关闭）</td></tr>
        <tr><td>OpenClaw</td><td><code>clawhub install ponytail</code>（<code>ponytail-review</code> 等技能同样安装）</td></tr>
        <tr><td>Qoder</td><td>检出上游仓库会自动读 <code>AGENTS.md</code>；可复制 <code>.qoder/rules/ponytail.md</code>，需要完整插件档时再合并 <code>hooks/qoder-hooks.json</code>（把 <code>PONYTAIL_DIR</code> 换成检出路径）</td></tr>
        <tr><td>Swival</td><td>先 <code>swival skills add --global https://github.com/DietrichGebert/ponytail</code>，再 <code>swival skills add ponytail</code></td></tr>
      </tbody>
    </table>
    <h2>仅指令（复制文件）</h2>
    <p>只有常驻规则，没有档位命令：</p>
    <ul>
      <li>Cursor 规则文件：<code>.cursor/rules/ponytail.mdc</code>（不要和 hooks 同时启用）</li>
      <li>Windsurf：<code>.windsurf/rules/ponytail.md</code></li>
      <li>Cline：<code>.clinerules/ponytail.md</code></li>
      <li>Copilot Chat（编辑器扩展，不是 CLI）：<code>.github/copilot-instructions.md</code></li>
      <li>Kiro：把 <code>.kiro/steering/ponytail.md</code> 拷到 <code>~/.kiro/steering/</code> 或项目里</li>
      <li>读 <code>AGENTS.md</code> 的：Amp、Jules、Zed、CodeWhale、Junie（需在设置里指定 Guidelines Path）、Codex 的 VS Code 扩展、Factory Droid</li>
    </ul>
    <p>文件对照：<a href="https://github.com/DietrichGebert/ponytail/blob/main/docs/agent-portability.md">docs/agent-portability.md</a>。</p>
  `,
  modes: `
    <h1>lite / full / ultra</h1>
    <p>默认 <strong>full</strong>。档位保持到你改掉或会话结束。</p>
    <table>
      <thead><tr><th>档位</th><th>行为</th></tr></thead>
      <tbody>
        <tr><td><code>lite</code></td><td>按你的要求做完，再用一行指出更懒的替代方案，由你选。</td></tr>
        <tr><td><code>full</code></td><td>强制走阶梯。标准库和平台原生优先。最短 diff、最短解释。</td></tr>
        <tr><td><code>ultra</code></td><td>YAGNI 极端档。先删后加。先交一行实现，同时质疑其余需求。</td></tr>
        <tr><td><code>off</code></td><td>本会话剩下时间不再注入 Ponytail。</td></tr>
      </tbody>
    </table>
    <h2>同一句话，三种回答</h2>
    <p>需求：「给这些 API 响应加缓存。」</p>
    <ul>
      <li><strong>lite：</strong>先加缓存，再提一句 <code>functools.lru_cache</code> 一行就能覆盖。</li>
      <li><strong>full：</strong>在 fetch 上加 <code>@lru_cache(maxsize=1000)</code>，不写自定义缓存类。</li>
      <li><strong>ultra：</strong>没 profiler 数据就不加缓存；手写 TTL 类视为虫窝。</li>
    </ul>
    <h2>这些永远不能偷懒</h2>
    <ul>
      <li>信任边界上的输入校验</li>
      <li>防止丢数据的错误处理</li>
      <li>安全与基本无障碍</li>
      <li>你明确要求的东西</li>
      <li>先读懂真实调用链再选阶梯</li>
    </ul>
    <p>说 “stop ponytail” 或 “normal mode” 可退出。你坚持要 120 行版本，它还是会写。</p>
  `,
  commands: `
    <h1>命令</h1>
    <p>需要支持技能的宿主（Claude Code、Codex、Devin CLI、OpenCode、Gemini、pi、Swival、Hermes、Qoder、Grok Build、Copilot CLI）。Cursor <strong>hooks</strong> 只能用普通消息切换档位。仅指令适配器没有这些命令。</p>
    <table>
      <thead><tr><th>命令</th><th>作用</th></tr></thead>
      <tbody>
        <tr><td><code>/ponytail [lite|full|ultra|off]</code></td><td>设强度。无参数：若已关闭则按默认打开，否则报告当前档。</td></tr>
        <tr><td><code>/ponytail-review</code></td><td>审当前 diff 是否过度设计，给出删除清单。</td></tr>
        <tr><td><code>/ponytail-audit</code></td><td>同样思路，扫整个仓库，大刀优先。</td></tr>
        <tr><td><code>/ponytail-debt</code></td><td>把 <code>ponytail:</code> 捷径注释收成一本台账，「以后再说」不再失踪。</td></tr>
        <tr><td><code>/ponytail-gain</code></td><td>显示公开基准成绩（一次性，不改档）。</td></tr>
        <tr><td><code>/ponytail-help</code></td><td>速查卡（一次性）。</td></tr>
      </tbody>
    </table>
    <h2>各宿主写法</h2>
    <ul>
      <li>Codex CLI / IDE：<code>$ponytail-review</code></li>
      <li>Copilot CLI：<code>/ponytail:ponytail-review</code></li>
      <li>Devin：<code>/ponytail:ponytail</code>、<code>/ponytail:ponytail-review</code> 等</li>
      <li>Hermes 技能：<code>ponytail:ponytail-review</code></li>
      <li>Swival 命令行：前缀 <code>$</code>，例如 <code>$ponytail-review</code></li>
    </ul>
    <h2>延期捷径</h2>
    <p>简化有已知上限时，应留下注释：</p>
    <pre><code># ponytail: global lock, per-account locks if throughput matters</code></pre>
    <p>之后跑 <code>/ponytail-debt</code>，别让这些注释烂在仓库里。</p>
  `,
  ladder: `
    <h1>决策阶梯怎么用</h1>
    <p>助手<strong>先读懂问题</strong>（读相关文件、顺着真实调用走），再停在第一根撑得住的横档：</p>
    <ol class="ladder">
      <li><strong>这件事需要存在吗？</strong>不需要 → 跳过（YAGNI）。</li>
      <li><strong>仓库里已有吗？</strong>复用。</li>
      <li><strong>标准库行不行？</strong>用标准库。</li>
      <li><strong>平台原生行不行？</strong>用原生（日期控件、CSS、数据库约束）。</li>
      <li><strong>已安装的依赖行不行？</strong>用它。几行能写完就别再加包。</li>
      <li><strong>一行行不行？</strong>就一行。</li>
      <li><strong>以上都不行：</strong>才写能工作的最小代码。</li>
    </ol>
    <p>修 bug 修共享根因，不要只给工单提到的那一个调用方打补丁。</p>
    <p>非平凡逻辑留下一个最小可跑检查（assert demo 或小小的 <code>test_*.py</code>）。一行玩具代码不需要测试套件。</p>
  `,
  config: `
    <h1>默认档位与配置</h1>
    <p>不必配置。可选默认：</p>
    <ul>
      <li>环境变量：<code>PONYTAIL_DEFAULT_MODE</code> = <code>lite</code> | <code>full</code> | <code>ultra</code> | <code>off</code></li>
      <li>文件：<code>~/.config/ponytail/config.json</code> 的 <code>defaultMode</code>（Windows：<code>%APPDATA%\\ponytail\\config.json</code>）</li>
    </ul>
    <pre><code>{ "defaultMode": "full" }</code></pre>
    <h2>子 agent</h2>
    <p>在会向 Agent 工具子任务注入规则的宿主上，可用 <code>PONYTAIL_SUBAGENT_MATCHER</code>（不区分大小写、默认不锚定的正则）匹配 <code>agent_type</code>。例如 <code>explore|general</code>、<code>^general$</code>，插件类型形如 <code>plugin:name</code>。未设置表示注入所有子 agent；正则无效时回退为全部注入。Cursor 的子 agent 收不到规则集。</p>
  `,
  uninstall: `
    <h1>卸载</h1>
    <p>先从克隆目录运行 <code>node scripts/uninstall.js</code>，<strong>再</strong>卸插件（脚本在插件里，先卸插件会把脚本删掉）。它会清掉档位标记、<code>~/.config/ponytail/config.json</code>、Cursor hook 条目，以及仍指向 ponytail 的 Claude <code>statusLine</code>。</p>
    <table>
      <thead><tr><th>宿主</th><th>卸载命令</th></tr></thead>
      <tbody>
        <tr><td>Claude Code</td><td><code>/plugin remove ponytail</code></td></tr>
        <tr><td>Codex</td><td><code>codex plugin remove ponytail</code></td></tr>
        <tr><td>Devin CLI</td><td><code>devin plugins remove ponytail</code></td></tr>
        <tr><td>Grok Build</td><td><code>grok plugin uninstall ponytail</code></td></tr>
        <tr><td>Pi</td><td><code>pi uninstall ponytail</code></td></tr>
        <tr><td>Cursor hooks</td><td><code>node scripts/cursor-hooks.js uninstall</code>（项目级加 <code>--project</code>）</td></tr>
        <tr><td>复制的规则</td><td>删掉你复制的那份文件</td></tr>
      </tbody>
    </table>
  `,
  faq: `
    <h1>常见问题</h1>
    <h2>能和 Caveman 一起用吗？</h2>
    <p>能。Caveman 压缩<strong>说话</strong>；Ponytail 压缩<strong>写出来的代码</strong>。</p>
    <h2>一定要配置吗？</h2>
    <p>不用。默认档位可选项而已。</p>
    <h2>Cursor 云端 / 子 agent 不吃规则</h2>
    <p>这是已知限制：云端不跑 <code>sessionStart</code>；<code>subagentStart</code> 不能注入上下文。那些路径若必须常驻文本，用项目 rule 文件——同时 hooks 就不再管档位。</p>
    <h2>Claude 装完没反应</h2>
    <p>两条 <code>/plugin</code> 必须分两次发送，不能粘在同一条里。</p>
    <h2>示例在哪？</h2>
    <p>上游仓库 <a href="https://github.com/DietrichGebert/ponytail/tree/main/examples">examples/</a>（日期选择器一类：原生 HTML、标准库、一行实现）。</p>
    <h2>许可证</h2>
    <p>MIT。上游：<a href="https://github.com/DietrichGebert/ponytail">DietrichGebert/ponytail</a>。</p>
  `,
};

const EMPTY_NAV = "没有匹配。试试「cursor」「claude」或「ultra」。";
