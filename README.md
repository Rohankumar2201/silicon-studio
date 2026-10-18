<div align="center">

# Silicon Studio

### Design. Simulate. Verify. Build.

An interactive workspace for digital hardware engineering.
Ten browser-based tools, with a guide for each one.

[Explore the tools](#the-tools) · [Quick start](#quick-start) · [Deploy](#deploy-to-vercel)

</div>

---

## What is Silicon Studio?

Digital design is easier to learn and faster to debug when you can see it working. Silicon Studio brings together ten interactive tools that cover the path from Boolean logic to RTL to hardware interfaces, and puts them behind one clean, searchable website.

Every tool has its own guide page that explains what it does, the engineering concept behind it, how to use it step by step, how to read its output, and where its limits are. You understand a tool before you open it, then launch it in the same tab.

**Who it's for**

- Electronics and computer engineering students
- RTL and FPGA beginners and hobbyists
- Anyone who wants to check a hand-worked design or visualize a protocol

## The tools

### Logic Design
| Tool | What it does |
|------|--------------|
| **Sankshepa K-map Solver** | Minimizes Boolean functions with Karnaugh maps |
| **Boolean Expression Solver** | Parses, simplifies and compares Boolean expressions |
| **Digital Logic Playground** | Build and simulate gate-level circuits in the browser |
| **FSM Designer** | Draw a finite-state machine and turn it into HDL |

### RTL Development
| Tool | What it does |
|------|--------------|
| **Verilog Templates Library** | Reusable Verilog and SystemVerilog starting points |
| **UART Generator** | Generates UART transmitter and receiver RTL |

### RTL Visualization
| Tool | What it does |
|------|--------------|
| **RTL Circuit Visualizer** | Turns a supported subset of Verilog into a schematic |
| **Verilog Waveform Viewer** | Inspect simulation waveforms from VCD files |

### Digital Interfaces
| Tool | What it does |
|------|--------------|
| **SPI Visualizer** | SPI transactions as synchronized waveforms |
| **I²C Visualizer** | I²C transactions on SCL and SDA |

## Highlights

- **Guided, not just linked.** Each tool has a dedicated guide with concepts, steps, an example and limitations.
- **Fast search and filters.** Search by name, topic or protocol and filter by category, instantly.
- **Shareable URLs.** Every guide has its own address that survives refresh and direct visits.
- **Dark and light themes.** Your choice is saved and applied before the page paints.
- **Accessible by default.** Keyboard navigation, visible focus states and reduced-motion support.
- **Lightweight.** No backend, no accounts, no tracking, no runtime dependencies.

## Quick start

Requires Node.js 18 or newer.

```bash
git clone https://github.com/Rohankumar2201/silicon-studio.git
cd silicon-studio
npm install
npm run dev
```

Open http://localhost:5173.

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build, then an inventory check |
| `npm run preview` | Serve the production build locally |

## How it's built

Vite and vanilla JavaScript, with a small History API router and no framework.

```
src/
├── data.js     # every tool's data in one place
├── main.js     # routing, pages, search and filters
└── style.css   # design tokens and both themes
```

All tool content lives in `src/data.js`. Cards, filters, guides and links all render from it, so editing one entry updates everything. To add a tool, append an entry, update the count in `scripts/check.mjs` and run `npm run build`.

## Deploy to Vercel

1. Push the repo to GitHub.
2. In Vercel choose **Add New → Project** and import it.
3. Keep the detected settings: Vite, build `npm run build`, output `dist`.
4. Deploy.

`vercel.json` rewrites unknown paths to `index.html`, so guide URLs work on refresh.

## Status

Guide content was written from each tool's build specification and still needs a pass against the live apps. Browser testing and an accessibility audit are also pending.

## Author

Built by [Rohan Kumar](https://github.com/Rohankumar2201).