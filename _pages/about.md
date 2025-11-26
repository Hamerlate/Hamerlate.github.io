---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Hi! I’m **Zhiwen Mo (莫志文)**, a first-year PhD student in the Department of Computing at [Imperial College London](https://www.imperial.ac.uk/), co-advised by [Dr. Hongxiang Fan](https://os-hxfan.github.io/) and [Prof. Wayne Luk](https://www.doc.ic.ac.uk/~wl/). My PhD is funded by the [ARIA Scaling Compute](https://www.aria.org.uk/opportunity-spaces/nature-computes-better/scaling-compute/) project via UKRI.

Previously, I was a research intern at [Microsoft Research Asia](https://www.microsoft.com/en-us/research/group/system-research-group-asia/) (MSRA), supervised by [Dr. Lingxiao Ma](https://xysmlx.github.io/) and [Dr. Jilong Xue](https://scholar.google.com/citations?user=xKI6HXgAAAAJ&hl=en), with generous help from [Dr. Shijie Cao](https://caoshijie0501.github.io/) and [Dr. Fan Yang](https://fanyangcs.github.io/).

I earned my Bachelor's degree from the School of Microelectronics at Shanghai Jiao Tong University, ranking 1st with a GPA of 3.96/4.3.

I’m broadly interested in **ML hardware and systems**, particularly in **GPU microarchitecture**, **performance modeling**, **kernel optimization**, and **hardware-software co-design**.

Email: [zhiwen.mo25@ic.ac.uk](mailto:zhiwen.mo25@ic.ac.uk)

---

## 📰 News

- **June 2025** Presented [LUT Tensor Core](https://dl.acm.org/doi/abs/10.1145/3695053.3731057) at ISCA'25. [Slides](/files/LUT_Tensor_Core_ISCA_Slides.pdf)

---

## 🎓 Education

- **PhD in Computing**, Imperial College London  
  *2025–2028 (expected)* · Funded by [ARIA Scaling Compute](https://www.aria.org.uk/opportunity-spaces/nature-computes-better/scaling-compute/) (UKRI)
- **PhD in Electronic Engineering**, Shanghai Jiao Tong University *(withdrawn)*  
  *2022–2024* *Zhiyuan Honor PhD Program, ~top 2%*
- **B.Eng. in Microelectronics**, Shanghai Jiao Tong University  
  *2018–2022* · GPA: 3.96/4.3 (Ranked 1st)

---

<style>
.exp-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}
.exp-left {
  width: 120px;
  font-weight: bold;
  color: #222;
}
.exp-middle {
  flex: 1;
  padding: 0 20px;
}
.exp-middle p {
  margin: 4px 0;
}
.exp-middle ul {
  margin: 4px 0 8px 16px;
}
.exp-right img {
  height: 36px;
}
.exp-container:hover {
  background: #f9f9f9;
  border-radius: 8px;
  transition: 0.2s;
}
</style>

<h2>💼 Internship</h2>

<div class="exp-container">
  <div class="exp-left">2023–2025</div>
  <div class="exp-middle">
    <p><strong>Microsoft Research Asia</strong> – System Research Group</p>
    <ul>
      <li>GPU performance modeling and kernel optimization</li>
      <li>
        Hardware for low-bit LLM inference —
        <a href="https://www.microsoft.com/en-us/research/blog/advances-to-low-bit-quantization-enable-llms-on-edge-devices/" target="_blank">
          Microsoft Research Blog
        </a>
      </li>
    </ul>
  </div>
  <div class="exp-right">
    <img src="/images/microsoft.png" alt="Microsoft Logo" style="height:30px;">
  </div>
</div>

<div class="exp-container">
  <div class="exp-left">2022–2023</div>
  <div class="exp-middle">
    <p><strong>Shanghai AI Laboratory</strong> – SoC Design</p>
    <ul>
      <li>Early-stage investigation for wafer-scale chips</li>
    </ul>
  </div>
  <div class="exp-right">
    <img src="/images/sh_ai_lab.png" alt="Shanghai AI Lab Logo" style="height:76px; margin-left: -12px;">
  </div>
</div>

<h2>📄 Selected Publications</h2>

<style>
.pub-entry {
  display: flex;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 12px;
  align-items: center;
  font-size: 0.95em;
  line-height: 1.4;
}
.pub-venue {
  width: 80px;
  flex: 0 0 80px;
  font-weight: bold;
  color: #fff;
  background: #444;
  border-radius: 5px;
  padding: 6px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pub-content {
  flex: 1;
  padding: 0 16px;
}
.pub-year {
  min-width: 60px;
  color: #888;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<div>
{% assign top_pubs = site.data.publications | where: "featured", true %}
{% for pub in top_pubs %}
  <div class="pub-entry">
    <div class="pub-venue">
      {{ pub.venue_short }}
    </div>
    <div class="pub-content">
      <div><strong>{{ pub.title }}</strong></div>
      <div>{{ pub.authors | markdownify }}</div>
      <div><em>{{ pub.venue_full }}</em></div>
    </div>
    <div class="pub-year">
      {{ pub.year }}
    </div>
  </div>
{% endfor %}
</div>

<p style="margin-top: 10px;">
  👉 See full list at <a href="/publications/">Publications</a>
</p>


## 🏆 Honors & Awards
- **UKRI PhD Scholarship**, Imperial College London (£22,780/year, *2025–2028*)  
- **Chinese National Scholarship**, Ministry of Education (*2020–2022*)  
- **SenseTime Scholarship**, Top 30 nationwide in AI (*2021*)  
- **Excellent Graduate of Shanghai**, awarded by Shanghai (*2022*)  
- **First Prize**, Arm Cup (East China Division) (*2021*)  

---

## 🛠 Technical Skills

- **Hardware**: Verilog, SystemVerilog  
- **Software**: Python, C/C++, CUDA (incl. profiling with `ncu`/`nsys`), ROCm (incl. `rocprof`/`roccomute`), MATLAB

---

## 🎨 Misc

Aside from Computer Science:  
- 🎹 Classical music lover (with perfect pitch 🎶⭐)  
- ⚽ Footballer (center back)  
- 🚴 Cycling enthusiast (hands-free rider 😄)  
- ☕ Coffee lover  
- 🎮 Hardcore fan of HoYoverse/miHoYo

---

*Thanks for stopping by!*

<!-- <div style="text-align:center; margin-top:16px;">
  <img src="/images/cyrene.png" alt="Cyrene" style="max-width: 560px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,.08);" />
  <div style="color:#777; font-size: 0.9em; margin-top: 6px;">Oh Stay True</div>
</div> -->


<div style="text-align:center; margin: 24px auto; padding: 0 12px;">
  <img
    src="/images/cyrene.png"
    alt="Cyrene"
    style="display: block; width: 100%; max-width: 560px; height: auto; margin: 8px auto 10px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,.08);"
  />
  <div style="color:#777; font-size: 0.9em; margin-top: 8px; text-align:center;">
  Cyrene from HSR.<br>
  </div>
</div>