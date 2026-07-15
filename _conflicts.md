# Content conflicts found during Stage 2 (for client resolution)

Rule followed: components accept every disputed value as data; the demo route
uses the FIRST variant encountered. Nothing below was averaged or resolved.

## 1. Series taxonomy — two different tier trios

- **Automotive solution page:** Comfort Series / Plus Series / Signature Series
  (green / blue / red)
- **Products (automotive films) page:** Essential / Advanced / Signature
  protection levels (green / blue / red)

Same conceptual good-better-best structure, different names. Components treat
series as data (`SeriesColumn[]`); demo uses Comfort/Plus/Signature (first
encountered).

## 2. Signature-tier IRR

- Automotive solution compare table + Technologies page: **"Up to 98% (1400nm)"**
- Products page, TITAN X card: **IRR (1400nm) ">99%"**

Demo uses 98%.

## 3. Automotive heat reduction (flagged in brief)

- One variant: **"Up to 10°C"** (also on the attached automotive stat bar)
- Other variant: **"Up to 32.5°C"**

Demo uses 10°C. Note the same automotive screen also shows a thermal
comparison of **68°C → 38°C** (a 30°C surface delta) next to the "Up to 10°C"
stat — cabin vs surface temperature may explain it, but the copy doesn't say.

## 4. UV400 rejection

- Technologies spectrum annotation + automotive stat bar: **"Blocks 99.99% UV400"**
- Product cards (TITAN X, DIAMOND X, RAYPRO, ANTI FADE 90…): **"UV400 100%"**

Demo uses 99.99%.

## 5. HEV blue-light blocking

- Technologies page: **"Blocks up to 100% HEV Blue Light (380–420nm)"**
- Several product cards instead quote **"UV380 99%"** (different metric,
  different wavelength cutoff — 380 vs 420nm)

Demo uses the UV+420 / up-to-100% framing.

## 6. Visible-light band range

- Technologies page spectrum: **Visible 420–780nm**
- Stage 2 brief (and standard convention): **Visible 400–780nm**

Demo uses 400–780nm per the brief; the diagram takes band ranges as data.

## 7. Solution naming — "Personal Care" vs "Personal Protection"

- Home "Choose Your Solution" card: **PERSONAL CARE**
- Stage brief, accent tokens, guide page: **Personal Protection**

Demo uses "Personal Protection" (matches the token/schema key
`personal-protection`).

## 8. Warranty phrasing

- Technologies cert strip: **"eWarranty — Up to 10 Years Performance Warranty"**
- Home/stat usage: **"10+ Years"**

Demo uses "Up to 10 Years". Minor, but "10+" claims more than "up to 10".

## 9. Products-page navigation diverges from main nav

Products screen shows a different header (Automotive Films / Technology /
Why IrisPro / Projects / Resources / About Us) and different logo lockup vs
the main site nav (Solutions / Technologies / Products / Projects / Learning
Centre / Sustainability / About Us). Also "Learning Centre" (home nav) vs
"Knowledge Centre" (guide page breadcrumb + nav). Stage 3 needs a ruling on
which IA wins.

---

# Stage 3 additions (navigation & IA — for client resolution)

Rule unchanged: nothing below is resolved. Stage 3 builds navigation from
`src/config/navigation.ts` with the brief's provisional defaults; change the
config once the client rules, nothing else.

## 10. Nav label — "Learning Centre" vs "Knowledge Centre" (extends §9)

- Home screen main nav: **"Learning Centre"**
- Guide page breadcrumb + nav: **"Knowledge Centre"**

Stage 3 provisional default: **"Knowledge Centre"** (per the Stage 3 brief).
Routes live under `/knowledge` either way.

## 11. Product area naming — "Products" vs "Protection Series"

- Main site nav (home screen): **"Products"**
- Other reference screens: **"Protection Series"**
- Products screen's own divergent header (§9): **"Automotive Films"** as the
  section entry

Stage 3 provisional default: **"Products"**. Interacts with §1 (the
Comfort/Plus/Signature vs Essential/Advanced/Signature taxonomy split) —
whichever ruling lands should resolve both consistently.

## 12. Primary CTA — three competing labels

- **"Find A Dealer"** (home / automotive screens)
- **"Request Consultation"** (solution + guide screens)
- **"Request Building Assessment"** (building/commercial screens)

Stage 3 provisional default for the header CTA: **"Request Consultation"**
(per the Stage 3 brief). All three still appear as CTABar actions where the
source screens use them — the CTABar takes actions as data, so no ruling is
required for those; only the single global header CTA needs one.

## 13. Duplicate page variants (flagged in the Stage 3 brief)

There are **two distinct automotive solution screens** and **two distinct
residential solution screens** with different headlines and conflicting stats
(the automotive pair is the source of §2 and §3). Stage 3 templates render
one content object per route, so the client must pick a canonical variant per
page (or merge them) before Stage 4 content authoring. The fixture uses the
first-encountered variant's values, consistent with §§2–5.

---

# Stage 4a additions (content transcription — for client resolution)

Rule unchanged: canonical content objects use the denser screen variant; the
other variant is preserved verbatim under `_alternates` in the same JSON file.
Nothing is averaged or resolved.

## 14. Residential accent colour — green vs gold

Both residential screens are art-directed **green** throughout (buttons,
icons, series card headers), but the V2 accent tokens (Stage 1, flagged
provisional there) assign green to **sustainability** and champagne gold
(`#c8963e`) to residential. If the screens' green is intentional brand
direction for residential, the accent map needs a ruling — two solutions
cannot both own green.

## 15. Automotive page variants (specifics for §13)

- Variant A: **"Complete Protection for Every Drive"** · Variant B (canonical,
  denser): **"Complete Protection for Every Journey"**
- Thermal proof: A shows **cabin** 63.7°C → 31.2°C with **"Up to 32.5°C Heat
  Reduction*"**; B shows **surface** up to 68°C → up to 38°C with **"Up to
  10°C Infrared Heat Reduction*"** (the §3 pair, now with full context —
  cabin vs surface framing may explain it, the copy still doesn't say)
- Metric framing: A claims **"Reject up to 98% of total solar energy"** and
  "IRR (Total Solar Energy Rejection)" — conflating IRR with TSER; B and the
  compare table say **"IRR up to 98% (1400nm)"** (single-wavelength). These
  are different physical claims wearing the same number.
- A adds a cabin-temperature claim: **"can reach up to 70°C when parked"**;
  B says only "extremely hot".
- Footnotes differ: A "*Results may vary based on film series, glass type and
  environment." · B "*Results may vary based on film type, vehicle model,
  driving conditions and usage."

## 16. Residential page variants

- Variant A: **"Comfort Living. Better Protection. Smarter Choice."** ·
  Variant B (canonical): **"Complete Protection for Your Home"**
- A has **four** series cards (adds **Specialty Series** — High Heat
  Rejection / High Privacy / Decorative & Safety Films / Low Reflectivity /
  Custom Solutions); B has three. If Specialty is real product taxonomy it is
  currently only preserved in `_alternates`.
- A hero stat overlay: "Blocks up to 98% Total Solar Energy" (TSER framing
  again, see §15) / "Blocks up to 99.9% UV400" / "Up to 10°C Heat Reduction*"
- A VLT options: 70/50/35/20 (no 5%); automotive lists 70/50/35/20/5%.
- Review aggregates: home page "4.9 · 2,500+ reviews" vs residential A
  "4.9 · 1,360+ reviews" (site-wide vs residential scope, presumably — not
  stated).

## 17. UV400 rejection — now THREE values (extends §4)

- Technologies/automotive screens: **99.99%**
- Product cards: **100%**
- Both residential screens: **99.9%** ("Blocks up to 99.9% UV400" hero stat,
  "Blocks 99.9% UV400" homeowner tile)

## 18. SIRIM grade — "Grade A" vs "Grade A1"

- Automotive screens + residential B: **"SIRIM Certified Grade A"**
- Residential A cert chip + all four series cards: reads **"Grade A1"**
  (marked `_verify` — low-resolution; could be a rendering of "A")

## 19. Series taglines differ per screen (extends §1)

- Comfort: "Great Comfort. Great Value." (auto B, resi B) vs "Essential
  Protection, Everyday Comfort" (auto A) vs "Everyday Comfort" (resi A)
- Plus: "Enhanced Comfort. Better Performance." vs "Enhanced Performance,
  Extra Protection" vs "Enhanced Performance"
- Signature: "Maximum Performance. Ultimate Protection." vs "Ultimate
  Performance, Premium Experience" vs "Ultimate Protection"

---

# Stage 4b additions (Technologies / Projects / About — for client resolution)

## 20. Fleet-size claims disagree by two orders of magnitude

- About "Our Story" stats: **"1,000,000+ Vehicles & Buildings Protected"**
- Projects stat band: **"20,000+ Vehicles Protected · 8,000+ Homes Protected ·
  1,000+ Commercial Buildings"** (≈29,000 total)
- (Stage 2/3 demo data and the home screen also used "20,000+ Vehicles
  protected".)

Both are authored as transcribed on their own pages. The client must decide
which figure (or scope definition) is canonical.

## 21. Nav label — "Technology" vs "Technologies" (extends §§9–12)

- About Us + Projects screens: **"Technology"** (with "Protection Series" and
  "Knowledge Centre"; About's CTA is **"Request Building Assessment"** —
  confirming §12's third CTA variant)
- Technologies screen: **"Technologies"** (with "Products", "Learning
  Centre", "Sustainability" — the §9 home IA) and an all-caps **"IRISPRO"**
  wordmark; its body copy also consistently spells the brand "IRISPRO"
  (vs "IrisPro" everywhere else).

## 22. HEV Blue Light wavelength — "380–430nm" appears once

- Technologies capability tile: **"Blocks HEV Blue Light 380–430nm"**
- Every other occurrence site-wide (including the same screen's own spectrum
  diagram and patent body copy): **380–420nm**

Marked `_verify` in content — likely a typo on the V1 screen, but per the
rules it is not corrected. Same screen also confirms §6 (Visible Light
**420–780nm** on Technologies vs 400–780nm elsewhere) — transcribed
faithfully as 420–780nm on the technologies page.

## 23. Projects page variants + "Diamond" vs "Diamond X"

- The attached (canonical) Projects screen: **Automotive / Residential /
  Commercial** toggle; featured: Mercedes-Benz G63 (Titan X), Luxury
  Bungalow (RayPro 70), Corporate Office (Diamond X), 5 Star Hotel
  (**"Diamond"** — no X; either a distinct product or a truncation, marked
  for verification).
- A second Projects screen exists (NOT attached this pass): **Building /
  Automotive** toggle, featured OCBC Bank Tower ("4 GBI Points") and
  Putrajaya Project ("In Progress"), and a fifth "10+" stat in its stat bar.
  Pending client decision on which variant is canonical.
- Related observation: the two "Trusted By" logo rows are disjoint sets —
  home screen: Porsche, Petronas, Sunway, IJM, UEM Sunrise, KPJ, Gamuda;
  About screen: Tenaga Nasional, Motorola, Malaysia Airports, Honeywell,
  Faber-Castell, WCT, Sime Darby Property, KPJ. Possibly intentional
  (different audiences); flagged so Stage 5 doesn't "deduplicate" them.

---

# Stage 4c additions (product catalogues — for client resolution)

## 24. Series taxonomy is now a THREE-WAY conflict (extends §1, §19)

- **Solution pages:** Comfort / Plus / Signature
- **Automotive products screen:** protection levels **Essential / Advanced /
  Signature** (matching §1's earlier sighting), while its own product cards
  carry badges **SIGNATURE / PRIVACY + HEAT / HEAT REJECTION / HEAT REJECTION
  + SECURITY**
- **Building products screen:** card groups **Signature Series / Privacy +
  Heat Series / Heat Rejection Series / Heat Rejection + Security**, and its
  comparison table groups **Signature / Heat Rejection / Privacy / Security**

Three incompatible taxonomies (four if the card-badge grouping counts) now
label the same product range. Filtering, comparison tables and cross-links
between solution pages and product grids cannot be wired coherently until
the client picks one. Additionally, the automotive catalogue's
Essential/Advanced membership is shown nowhere — only Signature products are
identifiable — so those filter chips currently match nothing.

## 25. IRR ceiling — ">99%" vs "up to 98%", now on the SAME screen (extends §2)

- Automotive products screen, Titan X card: **IRR (1400nm) ">99%"**
- The SAME screen's "Why Choose IrisPro?" checklist: **"Superior Heat
  Rejection up to 98% IRR (1400nm)"**
- Building products screen table, Signature row: **"98% – >99%"** (both at once)
- Solution pages (§2): Signature **"Up to 98% (1400nm)"**

## 26. Cross-screen product collisions (automotive vs building catalogues)

- **"Diamond X"** (automotive) vs **"Diamond"** (building) — same slot, same
  technology (Multi Layer Titanium Sputter), different name.
- **Titan X VLT:** automotive **69% / 60% / 15%** vs building **69% / 15%**
  (no 60% — possibly a genuine variant difference; not pattern-completed).
- **Silver Black VLT:** automotive **76%** vs building **69%**.
- **CS Pro IRR (1400nm):** automotive **90%**; building reads **"40%"** but is
  marked `_verify` (a 50-point gap is either a different product or a typo —
  not transcribed as fact).
- **UV metrics are intentionally different and NOT normalised:** automotive
  cards quote **UV400 100%** / **UV380 99%**; building cards quote
  **BLR (400–420nm) 99%** / **UVR (380nm) 99%**. Four distinct measurement
  labels for overlapping claims — client should confirm which metric each
  product is actually certified against.

## 27. "SIRIM Grade A1" now appears on BOTH product screens (extends §18)

- Automotive products screen ("SIRIM Certified — Grade A1 Quality you can
  trust") and building products screen ("SIRIM Certified Grade A1") both
  read **Grade A1**; the solution screens read **Grade A**. The product
  screens are now consistent with each other, which weakens the earlier
  "rendering artifact" theory — the client should confirm the real grade.

## 28. Two more nav variants (extends §9, §21)

- Automotive products screen: **Automotive Films / Technology / Why IrisPro /
  Projects / Resources / About Us** (the §9 sighting, reconfirmed)
- Building products screen: **Building Window Films / Technology / Projects /
  Performance / Resources** — "Performance" is a new top-level item seen
  nowhere else.

---

# Stage 4d additions (Knowledge Centre — for client resolution)

## 29. Episode durations disagree for the SAME episodes across screens

- "Why IRR99% Still Feels Hot?": hub Most Popular Videos **2:58** (Ep. 024)
  vs Automotive Guide rail **3:02**
- "UV99% vs UV+420: What's the Difference?": hub **3:12** (Ep. 015) vs guide
  rail **2:45**
- "Best Window Film for Electric Vehicles": hub **3:22** (Ep. 042) vs guide
  rail **3:10**

Each screen's value is transcribed as shown on that screen. Either the clips
were re-cut between screens or one set is wrong — client to confirm the
canonical durations (and whether the rail entries are in fact the same
episodes).

## 30. Duration format is inconsistent

Learn the Basics lessons use zero-padded **"02:18"**-style durations; the
hub, Technology Explained and the guide rail use **"2:45"**-style. Preserved
as-is per screen. A canonical format should be picked before Stage 5 sorts
or compares durations.

## 31. Visible-light band boundary — third data point (extends §6)

The knowledge screens (Learn the Basics hero, Technology Explained "How It
Works") show **Visible Light 400–780nm**, agreeing with the Stage 2 brief
convention but disagreeing with the Technologies page spectrum
(**420–780nm**, §6/§22). The knowledge screens also introduce a FOURTH band
— **Infrared (MIR & FIR) 2500nm–1mm** — that appears nowhere else. (Schema
note: band bounds are numeric nm, so 1mm is stored as 1000000 and renders
as "2500–1000000nm" — display treatment pending.)

## 32. Hub categories without corresponding routes or screens

The hub's "Explore by Category" lists nine categories. Six have no screen in
any batch so far and no route: **Residential Guide, Commercial Guide,
Health & Protection, Sustainability & ESG, Myth vs Fact, Video Library**.
Their cards link to anticipated slugs (e.g. /knowledge/residential-guide)
which 404 until authored. The category carousel also has paging arrows —
more categories may exist off-screen. Related: the guide screens' footer
"Resources" column lists Video Library and Case Studies pages that also
don't exist yet.

## 33. "10+ Years Warranty" vs "Up to 10 Years Warranty" (extends §8)

- Learn the Basics + Technology Explained bottom strips: **"10+ Years
  Warranty — Long Lasting Protection"**
- Automotive Guide bottom strip: **"UP TO 10 YEARS WARRANTY — Long Lasting
  Protection"**
- Hub stat bar: **"10+ Years of Excellence"** (a different claim again —
  company age, not warranty)

"10+" claims more than "up to 10"; the two phrasings now alternate screen by
screen.

---

# Stage 4d Pass 2 additions (Guides 2–4 — for client resolution)

## 34. Guide information architecture is inconsistent across the four guides

- **Automotive Guide** and **Residential Guide**: 7 chapters × "6 Lessons"
  each, chapter accordion, right rail (episodes / questions / Ask AI).
- **Building Performance Guide**: **12 chapters**, no lesson bullets, no
  lesson counts, no rail; adds business objectives, a GBI panel and an ROI
  calculator instead.
- **Personal Protection**: **12 numbered blocks**, no chapters at all, no
  rail; its "Learning Journey" is 8 video modules.

If the Knowledge Centre is meant to feel like one system, these need
harmonising — otherwise templates/rails will keep diverging per guide.

## 35. Hub category labels don't match the guide page titles

- Hub card **"Commercial Guide"** → the page titled **"Building Performance
  Guide"** (hub links rewired to /knowledge/building-performance-guide).
- Hub card **"Health & Protection"** → the page titled **"Personal
  Protection"** (rewired to /knowledge/personal-protection-guide; the
  pairing is an assumption — flagged, client to confirm).
- The Stage 3 IA brief called these routes "building-performance" and
  "personal-protection guides", matching the pages, not the hub labels.

## 36. Personal Protection block 02 nm ranges vs site-wide spectrum values

The "Understanding Sunlight" table introduces sub-bands not used elsewhere:
- **UVB 280–315nm** (new, readable) · **UVA1 380–400nm** (matches the
  products screens' "UVA1 380–400nm")
- **UVA** range unreadable (reads like 310–3?0nm — would OVERLAP UVA1 if
  310–380) — `_verify`
- **HEV Blue Light** range unreadable (reads like 380–4?0nm; site standard
  is 380–420nm, but §22 documented a 380–430nm variant) — `_verify`
- **Visible Light** range unreadable (reads like 4?0–7?0nm; the site has
  both 400–780 (§31) and 420–780 (§6)) — `_verify`
Elsewhere on the same screen the benefit band and UV+420™ capabilities both
say **380 – 420nm** clearly.

## 37. Fourth primary-CTA variant + nav order (extends §12, §21)

The Personal Protection screen's header CTA reads **"Request An
Assessment"** — a fourth variant alongside Find A Dealer / Request
Consultation / Request Building Assessment. Its nav also orders items
differently (Knowledge Centre before Projects, Protection Series after).

## 38. Module taxonomy collisions (extends §29)

- Personal Protection "Learning Journey": the last two cards BOTH read
  **"Module 7"** ("Children" and "Family Protection") — almost certainly a
  Module 8 misprint; transcribed as shown, not renumbered.
- These 8 modules (Understanding UV / UV400 / UV+420™ / HEV Blue Light /
  Skin Ageing / Eye Protection / Children / Family Protection) do NOT match
  the hub's 10-module catalogue (Window Film Basics … Installation Academy).
  Two module systems are in circulation.
