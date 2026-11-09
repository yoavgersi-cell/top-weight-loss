import type { ArticleData } from "../../config";

// ───── Online hair loss treatment: the complete 2026 guide (Nov 9, 2026) ─────
// Pillar/hub page for the hair-loss vertical. Built for the Bing AI-search
// grounding queries that cite us ("most trusted digital hair loss treatment
// provider", "shampoo for hair loss", "online prescription hair loss treatment
// providers", "evaluate online hair loss treatment services", "best telehealth
// service dutasteride", "is happy head legit", "can iron deficiency cause hair
// loss") and the search keywords around oral vs topical minoxidil, Norwood
// stages and Hims alternatives. It links down to the narrower existing pages
// rather than repeating them.
//
// Sourcing rules followed here:
//   • Every medical fact links a source read for this article on Nov 9, 2026
//     (AAD, MedlinePlus, NHS, FDA, peer-reviewed reviews on PMC) and carries
//     that source's own date. VDPHL01 facts reuse the sources already cited in
//     our VDPHL01 and pipeline guides.
//   • Provider facts and prices come only from src/lib/seeds/hair-loss.ts and
//     src/lib/provider-audit.ts, with the August 2026 verification date. Hims,
//     Keeps and Ro have no verified prices, so none are given. No Trustpilot
//     or Reddit content.
//   • Oral minoxidil, dutasteride and spironolactone are named as off-label for
//     hair loss every time they are discussed. Finasteride and dutasteride are
//     described as generally not recommended for women and never in pregnancy.
//     No dosing instructions.
//   • Facts we could not read a source for (the Penha 2024 JAMA Dermatology
//     oral-vs-topical trial, the Gupta 2022 network meta-analysis, a ketoconazole
//     trial abstract) are left out rather than quoted from snippets.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // American Academy of Dermatology (patient pages)
  aadMale: "https://www.aad.org/public/diseases/hair-loss/treatment/male-pattern-hair-loss-treatment",
  aadFemale: "https://www.aad.org/public/diseases/hair-loss/types/female-pattern",
  aadShedding: "https://www.aad.org/public/diseases/hair-loss/insider/shedding",
  aadCauses: "https://www.aad.org/public/diseases/hair-loss/causes/18-causes",
  aadTransplant: "https://www.aad.org/public/diseases/hair-loss/treatment/transplant",
  aadTelemedicine: "https://www.aad.org/public/fad/digital-health/telemedicine",
  aadQuality: "https://www.aad.org/public/fad/digital-health/telemedicine/quality-care",
  // MedlinePlus (US National Library of Medicine)
  mlFinasteride: "https://medlineplus.gov/druginfo/meds/a698016.html",
  mlMinoxidil: "https://medlineplus.gov/druginfo/meds/a689003.html",
  mlMalePattern: "https://medlineplus.gov/ency/article/001177.htm",
  mlHairLoss: "https://medlineplus.gov/ency/article/003246.htm",
  // NHS
  nhs: "https://www.nhs.uk/conditions/hair-loss/",
  // FDA
  fdaTopicalFin: "https://www.fda.gov/drugs/human-drug-compounding/fda-alerts-health-care-providers-compounders-and-consumers-potential-risks-associated-compounded",
  fdaOnlinePharmacy: "https://www.fda.gov/drugs/besaferx-your-source-online-pharmacy-information/considering-online-pharmacy",
  // Peer-reviewed reviews and trials (PMC full text)
  fdaApprovedReview: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12608207/",
  dutVsFinMeta: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6388756/",
  dutVsFinReview: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11694415/",
  oralVsTopicalMeta: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12068484/",
  ldomSafety: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11942662/",
  topicalFinTrial: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9297965/",
  comboTopicalMeta: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12537375/",
  regrowthNma: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9900126/",
  llltMeta: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8675345/",
  prpMeta: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11551241/",
  micronutrients: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6380979/",
  // VDPHL01 (reused from our VDPHL01 and pipeline guides)
  vd304: "https://www.businesswire.com/news/home/20261019684103/en/Veradermics-Oral-VDPHL01-Achieved-Early-Consistent-and-Robust-Hair-Growth-in-Positive-Phase-3-304-Clinical-Trial-in-Male-Pattern-Hair-Loss",
  vdMedscape: "https://www.medscape.com/viewarticle/male-pattern-baldness-extended-release-minoxidil-regrows-2026a10013pk",
};

export const HL_ONLINE_TREATMENT_GUIDE: ArticleData = {
  slug: "online-hair-loss-treatment-guide",
  title: "Online Hair Loss Treatment in 2026: The Complete Guide",
  description:
    "How online hair loss treatment works in 2026: finasteride, dutasteride, oral vs topical minoxidil, shampoos, lasers and PRP compared, and how to pick a provider.",
  category: "Guide",
  readTime: "54 min read",
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-09",
  heroColor: "#EFF4F1",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Only two medicines are FDA-approved for pattern hair loss: topical minoxidil, for men and women, and oral finasteride, for men. Dutasteride and low-dose oral minoxidil are widely prescribed for hair loss, but off-label.",
    "Finasteride slows further hair loss in about 80% to 90% of men who take it, according to the American Academy of Dermatology, and results take about six months to show. Minoxidil can take six to 12 months.",
    "The FDA warned in April 2025 that no topical finasteride product is FDA-approved, after 32 adverse-event reports tied to compounded versions between 2019 and 2024. Ask any provider how its topicals are made and what side effects it discusses.",
    "A trustworthy online provider has a licensed clinician review your history before prescribing, lets you send photos, names its pharmacy, and publishes its prices and cancellation terms. Our three highest-ranked are Maximus, Happy Head and PeterMD.",
  ],
  sections: [
    {
      heading: "What is online hair loss treatment, and does it actually work?",
      body: `<div class="qa"><strong>The short answer</strong>Online hair loss treatment means a licensed clinician reviews your health history and photos through a website or app, and, if it's appropriate, prescribes medicine that's shipped to your door. It works as well as the medicines it gives you access to, and the best-studied ones do work for many people: finasteride slows further hair loss in most men who take it, and minoxidil helps both men and women. Neither works overnight, neither works for everyone, and both stop working when you stop using them. A good online service makes getting them easier; it doesn't make them stronger.</div>
<p>If you've noticed more scalp in the bathroom mirror, a hairline that's sitting a little higher than it used to, or a ponytail that feels thinner, you're in very large company. The ${ext(S.mlHairLoss, "US National Library of Medicine's MedlinePlus encyclopedia")} (reviewed June 2025) says about 80% of men show signs of male pattern baldness during their lifetime, and the ${ext(S.aadFemale, "American Academy of Dermatology")} calls female pattern hair loss the most common cause of hair loss in women. It's normal to feel worried about it, and it's also normal to feel a bit lost, because the internet is full of shampoos, serums, gummies and gadgets that promise a lot and prove very little.</p>
<p>This guide is our attempt to put all of it in one place, plainly. We cover how a telehealth consultation actually works, what's probably causing your hair loss, every main treatment ranked by the strength of its evidence, the side effects worth knowing about, how to tell a trustworthy online provider from a risky one, how the providers we rank compare, the options for women, and realistic timelines. Where a narrower question deserves its own page, we link to it, so think of this as the hub and the linked articles as the spokes.</p>
<h3>What this guide is and isn't</h3>
<p>Treatments Hub is a comparison site, not a medical provider. We don't prescribe, diagnose or sell medication. Every medical fact below links to the source we read it in, usually the American Academy of Dermatology, MedlinePlus, the NHS, the FDA or a peer-reviewed review, and carries that source's date. Provider details and prices come from our own verified provider records, dated August 2026, and we say so each time. Nothing here replaces a consultation with a clinician who knows your history.</p>
<p>One more thing before we start: hair loss is far easier to slow than to reverse. Both the ${ext(S.aadMale, "AAD")} and ${ext(S.aadCauses, "its guide to hair-loss causes")} make the same point, that people who start treatment soon after noticing hair loss tend to get the best results. If you've been putting off doing anything, the most useful thing this guide can do is help you take a sensible first step.</p>`,
    },
    {
      heading: "How does online hair loss treatment work, step by step?",
      body: `<p>Most online hair-loss services follow the same basic path. You answer a medical questionnaire, upload photos of your scalp, a licensed clinician reviews them, and if a prescription is appropriate it's sent to a pharmacy that ships to you. Ongoing care happens by message, with refills on a schedule. The details differ a lot from one provider to the next, and those details are where quality lives.</p>
<ol>
<li><strong>Intake questionnaire.</strong> Expect questions about when your hair loss started, its pattern, your family history, your general health, any medications or supplements you take, and, for some treatments, things like heart health, blood pressure or plans for pregnancy. Answer honestly. The questionnaire is the only thing standing between you and a prescription that might not suit you.</li>
<li><strong>Photos.</strong> Most services ask for pictures of your hairline, the top of your head and your crown. The ${ext(S.aadQuality, "American Academy of Dermatology")} specifically tells patients to check that an online clinic lets them submit photos, because without them it's hard to know what's going on.</li>
<li><strong>Clinician review.</strong> A physician, nurse practitioner or physician assistant licensed in your state reviews your answers and photos. Some services include a video or phone call; many work asynchronously, meaning the clinician reviews your file and replies by message. The ${ext(S.aadTelemedicine, "AAD's telemedicine guide")} (updated June 2023) notes that telemedicine can include video, phone, or securely sent photos and written descriptions, and that it works best for visible skin, hair and nail conditions.</li>
<li><strong>Prescription and delivery.</strong> If treatment is appropriate, the prescription goes to a pharmacy, which may be a standard retail pharmacy or a compounding pharmacy for custom formulas, and the medicine ships to you, usually in plain packaging.</li>
<li><strong>Follow-up.</strong> Good services check in at intervals, ask about side effects, and adjust the plan. Hair grows slowly, so most of the useful follow-up happens months in, not weeks.</li>
</ol>
<h3>What the clinician is really deciding</h3>
<p>The clinician's job is to answer three questions: is this probably pattern hair loss, or something else that needs a different approach; is the treatment safe for this person; and what combination is reasonable to start with. That first question matters more than people think. Patchy hair loss, a red or scaly scalp, sudden heavy shedding or hair loss with other symptoms all point away from simple pattern loss, and ${ext(S.mlMalePattern, "MedlinePlus")} lists exactly those signs as reasons to see a health care provider rather than assume it's ordinary balding.</p>
<p>A well-run online service will tell you when you need to be seen in person. The ${ext(S.aadQuality, "AAD's advice on online clinics")} is to find out whether the service can arrange an in-person visit with a dermatologist if you need one. That's a good test of whether a provider is practicing medicine or just running a checkout page.</p>
<p>For a shorter walkthrough focused purely on picking a service, see our guide to <a href="/hair-loss/articles/best-online-hair-loss-treatment">choosing the best online hair loss treatment</a>.</p>`,
    },
    {
      heading: "What's causing your hair loss, and why does the type matter?",
      body: `<p>The most common cause by far is hereditary pattern hair loss, called androgenetic alopecia. The ${ext(S.aadCauses, "American Academy of Dermatology")} describes it as the most common cause of hair loss worldwide, in both men and women. But it isn't the only cause, and several others look similar at first glance while needing completely different treatment. Getting the type right is the single most important step, because finasteride won't fix thyroid-related thinning and minoxidil won't cure a scalp infection.</p>
<h3>The main types, in plain English</h3>
<table><thead><tr><th>Type</th><th>What it usually looks like</th><th>Does it grow back?</th></tr></thead><tbody>
<tr><td>Male pattern hair loss</td><td>A receding hairline, often in an M shape, and thinning at the crown; ${ext(S.mlMalePattern, "MedlinePlus")} says it can end as a horseshoe of hair around the sides and back</td><td>Not on its own; treatment can slow it and regrow some hair</td></tr>
<tr><td>Female pattern hair loss</td><td>A widening part and overall thinning on top, with the front hairline usually kept, per the ${ext(S.aadFemale, "AAD")}</td><td>Not on its own; treatment can slow it and help regrowth</td></tr>
<tr><td>Telogen effluvium (shedding)</td><td>Much more hair than usual in the shower or brush, all over, a few months after a trigger</td><td>Usually yes, once the trigger passes</td></tr>
<tr><td>Alopecia areata</td><td>Round, smooth bald patches, sometimes in the beard or eyebrows</td><td>Often, and there are specific treatments</td></tr>
<tr><td>Traction alopecia</td><td>Thinning where hair is pulled tight by a hairstyle</td><td>Early on, yes; long-term pulling can cause permanent loss, the ${ext(S.aadCauses, "AAD")} warns</td></tr>
<tr><td>Scarring alopecia</td><td>Patches with inflammation, sometimes itchy or painful</td><td>No, once follicles are destroyed; early care matters</td></tr>
</tbody></table>
<h3>Other causes worth ruling out</h3>
<p>The AAD's list of causes also includes thyroid disease, hormonal imbalance such as polycystic ovary syndrome (PCOS), scalp psoriasis, scalp infection, some medications, and getting too little biotin, iron, protein or zinc. ${ext(S.mlHairLoss, "MedlinePlus")} adds anemia and crash diets, especially those without enough protein, to the list of triggers. The ${ext(S.nhs, "NHS")} (reviewed January 2024) names illness, stress, cancer treatment, weight loss and iron deficiency as common causes of temporary hair loss.</p>
<p>It's common to have more than one thing going on. A woman with a family history of thinning may also be low in iron; a man with an early receding hairline may also be in the middle of a stress shed. That's one reason it pays to tell your clinician about everything, including recent illness, weight loss, new medications, and, for women, changes to your periods or recent childbirth.</p>
<p>If you're on a weight-loss drug, our guide to <a href="/hair-loss/articles/glp1-hair-loss">GLP-1 drugs and hair loss</a> covers what the 2026 studies found. If stress seems to be the trigger, read <a href="/hair-loss/articles/can-stress-cause-hair-loss">can stress cause hair loss</a>. And if you suspect a supplement, our explainer on <a href="/hair-loss/articles/does-creatine-cause-hair-loss">creatine and hair loss</a> covers that common worry.</p>`,
    },
    {
      heading: "What do the key hair-loss terms mean?",
      body: `<p>Hair-loss conversations come with a lot of jargon. Here are the terms you'll see most often, defined plainly, so you can read a provider's website or a clinician's message without guessing.</p>
<ul>
<li><strong>Androgenetic alopecia (AGA).</strong> The medical name for hereditary pattern hair loss in men and women. ${ext(S.aadCauses, "The AAD")} explains that it means you've inherited genes that cause hair follicles to shrink and eventually stop growing hair.</li>
<li><strong>DHT (dihydrotestosterone).</strong> A hormone made from testosterone by an enzyme called 5-alpha reductase. ${ext(S.dutVsFinMeta, "A 2019 meta-analysis in Clinical Interventions in Aging")} describes DHT as the main androgen driving male pattern hair loss in the scalp. Finasteride and dutasteride work by blocking that enzyme. Our guide to <a href="/hair-loss/articles/dht-and-hair-loss">DHT and hair loss</a> goes deeper.</li>
<li><strong>Miniaturization.</strong> The gradual shrinking of a hair follicle so it produces shorter, finer hairs over time. ${ext(S.mlMalePattern, "MedlinePlus")} notes that in male pattern baldness the follicles remain alive, which is why some regrowth is possible.</li>
<li><strong>Norwood scale.</strong> The seven-stage scale clinicians use to describe how far male pattern hair loss has progressed, from a full hairline (stage I) to extensive balding (stage VII). See our <a href="/hair-loss/articles/norwood-scale">Norwood scale guide</a>.</li>
<li><strong>Ludwig scale.</strong> The three-stage scale (I to III) used for female pattern hair loss. ${ext(S.prpMeta, "A 2024 meta-analysis")} used Norwood I to VII and Ludwig I to III to classify the men and women in the trials it pooled.</li>
<li><strong>Telogen effluvium.</strong> Excessive shedding that happens when more hairs than usual enter the resting phase at once, usually a few months after a stressor. The ${ext(S.aadShedding, "AAD")} lists triggers including losing 20 pounds or more, giving birth, high fever, surgery, major stress and stopping birth-control pills.</li>
<li><strong>Anagen and telogen.</strong> Anagen is the growth phase of a hair; telogen is the resting phase, after which the hair sheds. Anagen effluvium is hair loss that happens when growth is stopped, as with chemotherapy, ${ext(S.aadShedding, "per the AAD")}.</li>
<li><strong>Terminal and vellus hairs.</strong> Terminal hairs are thick, pigmented scalp hairs; vellus hairs are fine and wispy. Many trials count terminal or "non-vellus" hairs because they're the ones that make hair look fuller.</li>
<li><strong>FDA-approved vs FDA-cleared.</strong> Medicines are approved; devices such as laser caps are usually cleared. The ${ext(S.aadMale, "AAD")} points out that the requirements for clearance are much less stringent than for approval.</li>
<li><strong>Off-label.</strong> When a doctor prescribes an approved medicine for a use the FDA hasn't approved. It's legal and common. Oral minoxidil and dutasteride are both used off-label for hair loss.</li>
<li><strong>Compounded medicine.</strong> A custom formula mixed by a pharmacy, such as a topical with several ingredients. ${ext(S.fdaTopicalFin, "The FDA")} notes that compounded drugs are not FDA-approved, so the agency hasn't evaluated their safety, effectiveness or quality before marketing.</li>
<li><strong>5-alpha reductase inhibitor (5-ARI).</strong> The drug class that includes finasteride and dutasteride.</li>
</ul>
<p>With those in hand, the rest of this guide should read much more easily.</p>`,
    },
    {
      heading: "What are the early signs of male pattern baldness?",
      body: `<p>The earliest signs are usually a hairline that's moving back at the temples and thinning at the crown, the spot on the back of the top of your head. ${ext(S.mlMalePattern, "MedlinePlus")} describes the typical pattern as a hairline that recedes into an "M" shape plus a circular thinning area at the vertex that slowly expands. Other early clues include more scalp showing under bright light, hair that feels finer, and a longer time for hair to grow to the length it used to reach.</p>
<p>The timing varies a lot. The ${ext(S.aadMale, "AAD")} says male pattern hair loss can start in the late teens or early twenties, though it usually appears later, and that by age 50 more than half of white men have a visible sign such as noticeable thinning, a receding hairline or balding.</p>
<h3>The Norwood stages, simplified</h3>
<table><thead><tr><th>Stage group</th><th>What you'd typically see</th><th>What it usually means for treatment</th></tr></thead><tbody>
<tr><td>Norwood I to II</td><td>A full or gently maturing hairline</td><td>Often just monitoring; a clinician can tell normal maturation from early loss</td></tr>
<tr><td>Norwood III (including III vertex)</td><td>Clear recession at the temples, sometimes early crown thinning</td><td>The stage where medical treatment has the most hair to protect</td></tr>
<tr><td>Norwood IV to V</td><td>Deeper recession and a larger thin crown, with a narrowing band between them</td><td>Medication can still hold and thicken; expectations should be realistic</td></tr>
<tr><td>Norwood VI to VII</td><td>The front and crown areas merge, leaving a horseshoe of hair at the sides and back</td><td>Medication protects what remains; a transplant or cosmetic options are often discussed</td></tr>
</tbody></table>
<p>These are broad groupings, not a diagnosis. A clinician uses your photos, family history and how fast things are changing to judge where you are. Our <a href="/hair-loss/articles/norwood-scale">Norwood scale guide</a> walks through each stage, and our page on <a href="/hair-loss/articles/receding-hairline-treatment">receding hairline treatment</a> covers the front-of-head question specifically.</p>
<h3>When a receding hairline isn't balding</h3>
<p>Many men's hairlines mature in their late teens and twenties, moving back slightly without continuing to recede. That's not the same as progressive pattern loss. The difference usually shows over time: a mature hairline settles, while pattern loss keeps going and is often joined by crown thinning. If you're unsure, take photos in the same light every few months; it's one of the most useful things you can bring to a consultation.</p>
<h3>When it might not be pattern loss at all</h3>
<p>${ext(S.mlMalePattern, "MedlinePlus")} advises contacting a health care provider if hair loss happens in an atypical pattern, including rapid loss, widespread shedding, patches or breakage; if it comes with itching, redness, scaling or pain; or if it begins after starting a new medicine. Those signs call for a proper diagnosis before you start any hair-loss product. Our longer explainer on <a href="/hair-loss/articles/male-pattern-baldness-explained">male pattern baldness</a> covers causes and treatment in more detail.</p>`,
    },
    {
      heading: "Which hair loss treatments have the strongest evidence?",
      body: `<p>Two medicines have FDA approval for pattern hair loss: topical minoxidil, for men and women, and oral finasteride, for men. ${ext(S.fdaApprovedReview, "A November 2025 review in the International Journal of Molecular Sciences")} states plainly that these are currently the only two FDA-approved medications for androgenetic alopecia. Everything else is either prescribed off-label, cleared as a device, or still being studied. That doesn't make the others useless, but it does tell you where the strongest evidence sits.</p>
<table><thead><tr><th>Treatment</th><th>FDA status for hair loss</th><th>Strength of evidence</th><th>Who it's for</th><th>Main caveats</th></tr></thead><tbody>
<tr><td>Oral finasteride</td><td>Approved (men)</td><td>Strong</td><td>Men</td><td>Sexual side effects in some men; not for women who are or could become pregnant</td></tr>
<tr><td>Topical minoxidil (2% and 5%)</td><td>Approved (over the counter)</td><td>Strong</td><td>Men and women</td><td>Scalp irritation; early shedding; must keep using</td></tr>
<tr><td>Oral dutasteride</td><td>Not approved for hair loss in the US; used off-label</td><td>Moderate: a few head-to-head trials vs finasteride</td><td>Men, under supervision</td><td>Side-effect profile similar to finasteride; not for women who could become pregnant</td></tr>
<tr><td>Low-dose oral minoxidil</td><td>Not approved for hair loss; used off-label</td><td>Moderate and growing; mostly smaller studies</td><td>Men and women, under supervision</td><td>Unwanted body and facial hair, fluid retention, faster heartbeat in a minority</td></tr>
<tr><td>Topical finasteride (compounded in the US)</td><td>No FDA-approved topical exists</td><td>Promising trial data for a manufactured spray; compounded versions unevaluated</td><td>Men</td><td>FDA safety alert, April 2025</td></tr>
<tr><td>Combination topicals</td><td>Compounded; not FDA-approved</td><td>Limited but encouraging for minoxidil plus finasteride</td><td>Varies by formula</td><td>Quality depends on the pharmacy</td></tr>
<tr><td>Spironolactone (women)</td><td>Not approved for hair loss; used off-label</td><td>Moderate, per the AAD</td><td>Women</td><td>Not for pregnancy; needs medical review</td></tr>
<tr><td>Ketoconazole shampoo</td><td>Not approved for hair loss</td><td>Weak; supportive at best</td><td>Anyone with scalp flaking or inflammation</td><td>Not a standalone treatment</td></tr>
<tr><td>Low-level laser (caps, combs, helmets)</td><td>Some devices FDA-cleared</td><td>Moderate: seven sham-controlled trials pooled in 2021</td><td>Men and women</td><td>Cost, consistency, long-term data</td></tr>
<tr><td>PRP injections</td><td>Procedure, not a drug approval</td><td>Low-quality, heterogeneous evidence</td><td>Men and women</td><td>Repeated sessions; out-of-pocket cost</td></tr>
<tr><td>Hair transplant</td><td>Surgical procedure</td><td>Established for suitable candidates</td><td>People with enough donor hair</td><td>Surgery; medication still needed for native hair</td></tr>
<tr><td>Supplements (biotin, saw palmetto, etc.)</td><td>Not drugs</td><td>Mostly weak or mixed</td><td>Only for a confirmed deficiency, in most cases</td><td>Biotin can distort some lab tests</td></tr>
</tbody></table>
<p>Each row has its own section below with sources. The short version: if you have pattern hair loss and want the best-supported start, the conversation usually begins with finasteride (for men) and minoxidil (for men and women), sometimes together. Our guides to <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride vs minoxidil</a> and <a href="/hair-loss/articles/finasteride-and-minoxidil-together">using finasteride and minoxidil together</a> explain why.</p>
<h3>How the treatments compare in pooled research</h3>
<p>${ext(S.regrowthNma, "A January 2023 network meta-analysis in Frontiers in Medicine")} pooled 17 placebo-controlled trials and concluded that some terminal-hair regrowth can be expected from most androgenetic alopecia treatments. It also found that responses to drug treatments came quickly and then tended to level off after roughly 12 to 16 weeks. In plain terms, the medicines work best at holding on to hair and producing a modest early gain, not at endless regrowth, which is exactly why starting early matters so much.</p>`,
    },
    {
      heading: "How well does finasteride work for hair loss?",
      body: `<p>For most men with pattern hair loss, finasteride works well at what it's best at: stopping or slowing further loss. The ${ext(S.aadMale, "American Academy of Dermatology")} says finasteride has been shown to slow down further hair loss in about 80% to 90% of men taking it, and that some men also see regrowth, especially those who start soon after noticing hair loss. It's a daily prescription pill, it was approved by the FDA for male pattern hair loss on December 19, 1997 under the brand name Propecia, according to the ${ext(S.fdaTopicalFin, "FDA")}, and it remains the most established medical treatment for men.</p>
<h3>How it works</h3>
<p>Finasteride blocks type 2 5-alpha reductase, the enzyme that converts testosterone into DHT. ${ext(S.mlFinasteride, "MedlinePlus")} (revised June 15, 2026) explains that it treats male pattern hair loss by blocking the body's production of a male hormone in the scalp that stops hair growth. Less DHT means less pressure on genetically sensitive follicles, so the shrinking slows down. A common myth is that finasteride "kills testosterone"; it lowers DHT, which is a different thing, and our explainer on <a href="/hair-loss/articles/does-finasteride-lower-testosterone">whether finasteride lowers testosterone</a> covers why.</p>
<h3>How long it takes</h3>
<p>Slowly, because hair grows slowly. The AAD says that if finasteride helps you, you'll start to see results in about six months. MedlinePlus says it may take at least three months before you see any improvement, that you should expect to see improvement during the first 12 months, and that if you've taken it for 12 months without improvement, further treatment probably won't help. Those are the honest checkpoints to plan around.</p>
<h3>What happens if you stop</h3>
<p>The benefit lasts only while you take it. The AAD is blunt about this: once you stop taking it, hair loss returns. MedlinePlus adds that you'll probably lose any hair that grew back during the first 12 months after stopping. That's why finasteride is best thought of as a long-term commitment, not a course of treatment.</p>
<h3>Who shouldn't take it</h3>
<p>MedlinePlus states that finasteride is only for use in men, and that women who are or may become pregnant shouldn't even touch broken or crushed tablets because of the risk to a male fetus. The ${ext(S.nhs, "NHS")} says simply that women should not use finasteride. Our site's position follows that: finasteride is generally not recommended for women, and never during pregnancy or when pregnancy is possible. The AAD does note that dermatologists sometimes prescribe it to selected women with strict pregnancy precautions, which we cover in the women's section below.</p>
<p>For a fuller look at the evidence, see <a href="/hair-loss/articles/does-finasteride-work">does finasteride work</a>, and if you're ready to get it, <a href="/hair-loss/articles/how-to-get-finasteride-online">how to get finasteride online</a> walks through the process and verified prices.</p>`,
    },
    {
      heading: "What are the side effects of finasteride?",
      body: `<p>Most men who take finasteride don't have problems with it, but a minority do, and the possible side effects are serious enough that a good clinician will talk them through before prescribing. The ${ext(S.aadMale, "AAD")} lists loss of libido, trouble getting or keeping an erection, breast swelling and tenderness, and depression, and notes that sexual side effects have been reported to continue after a patient stops taking it. Because of how serious those side effects can be, the AAD says a dermatologist will want to know about your existing conditions and medications before prescribing.</p>
<h3>What MedlinePlus lists</h3>
<p>${ext(S.mlFinasteride, "MedlinePlus")} (revised June 15, 2026) groups finasteride's side effects into two tiers:</p>
<ul>
<li><strong>Tell your doctor if these are severe or don't go away:</strong> difficulty getting or keeping an erection, decreased sexual desire, problems with ejaculation including lower ejaculate volume, and testicular pain.</li>
<li><strong>Call your doctor immediately for:</strong> breast changes such as increased size, lumps, pain or nipple discharge; signs of an allergic reaction; and new or worsening depression or thoughts of self-harm or suicide.</li>
</ul>
<p>MedlinePlus also says finasteride may decrease fertility in men, that sexual side effects may occur during treatment and after it's stopped, and that taking finasteride may increase the risk of a fast-growing, high-grade form of prostate cancer. It advises talking to your doctor about the risks.</p>
<h3>Putting the risk in proportion</h3>
<p>Two things are true at once. Finasteride has been prescribed for hair loss since 1997 and most men tolerate it, and some men have side effects that are distressing and, in a minority of reports, persistent. The responsible approach is neither to dismiss the risk nor to treat it as inevitable. Tell your prescriber about any history of depression, sexual health concerns or fertility plans; know which symptoms to report; and make sure your provider makes it easy to reach a clinician if something changes.</p>
<p>If you want to know whether finasteride affects testosterone, the short answer is that it lowers DHT, not testosterone; see <a href="/hair-loss/articles/does-finasteride-lower-testosterone">does finasteride lower testosterone</a>. Our dedicated guide to <a href="/hair-loss/articles/finasteride-side-effects">finasteride side effects</a> separates the common from the rare in more detail.</p>
<h3>What about topical finasteride?</h3>
<p>Some men look to topical finasteride hoping to avoid side effects. The trial data for a manufactured spray are encouraging, but the FDA's April 2025 alert on compounded topical versions is important reading, and we cover both in the topical finasteride section below.</p>`,
    },
    {
      heading: "Is dutasteride better than finasteride, and can you get it online?",
      body: `<p>Dutasteride appears to be somewhat more effective than finasteride in the trials that compare them, with similar rates of side effects, but it isn't FDA-approved for hair loss in the US, so it's prescribed off-label. ${ext(S.dutVsFinMeta, "A 2019 meta-analysis in Clinical Interventions in Aging")} pooled three randomized trials with 576 men and found dutasteride produced a larger increase in total hair count over 24 weeks, with no significant difference in altered libido, erectile dysfunction or ejaculation disorders compared with finasteride. The authors concluded dutasteride "seems to provide a better efficacy" with similar adverse-reaction rates.</p>
<h3>Why it might be stronger</h3>
<p>Dutasteride blocks both type 1 and type 2 5-alpha reductase, while finasteride blocks only type 2. ${ext(S.dutVsFinReview, "A 2024 systematic review in Dermatology Reports")} describes dutasteride as a dual inhibitor that leads to a larger reduction in DHT than finasteride, and notes that although it isn't FDA-approved for androgenetic alopecia, it's becoming increasingly used in clinics. That review covered nine studies and concluded dutasteride was more potent than finasteride, with comparable adverse events. It also flagged how thin the evidence is in women: only two of the nine studies included female participants.</p>
<h3>Who it's typically for</h3>
<p>Dutasteride usually comes up as a step after finasteride, for men who haven't responded enough, or as a starting choice for men and clinicians who want a stronger DHT blocker from the outset. It isn't a casual swap. Its side-effect profile overlaps finasteride's, and, like finasteride, it's generally not recommended for women and is never appropriate in pregnancy or when pregnancy is possible. ${ext(S.mlMalePattern, "MedlinePlus")} summarizes it neatly: dutasteride is similar to finasteride but may be more effective.</p>
<h3>Can you get dutasteride online?</h3>
<p>Yes, through some telehealth providers, after a clinician review. In our verified provider data (August 2026), <a href="/hair-loss/reviews/maximus">Maximus</a> offers oral dutasteride on its own, in an oral combination with oral minoxidil, and in a compounded gel; <a href="/hair-loss/reviews/happyhead">Happy Head</a> uses dutasteride in its custom topical and in its 3-in-1 oral capsule, and describes dutasteride as used off-label under medical supervision. <a href="/hair-loss/reviews/petermd">PeterMD</a> doesn't publish a dutasteride option. That makes Maximus the broadest choice in our ranking for someone specifically looking for a telehealth service that prescribes dutasteride, which is one reason it sits at the top of our list.</p>
<p>Our dedicated guides cover this in more depth: <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride vs finasteride</a> compares the two drugs, and <a href="/hair-loss/articles/dutasteride-online">dutasteride online</a> explains how to get it through telehealth and what each provider charges.</p>`,
    },
    {
      heading: "Oral vs topical minoxidil: which is better?",
      body: `<p>On the evidence so far, oral and topical minoxidil produce broadly similar results for pattern hair loss, and the choice usually comes down to convenience, tolerance and medical suitability. ${ext(S.oralVsTopicalMeta, "An April 2025 systematic review and meta-analysis in Skin Health and Disease")} included four trials comparing the two and found no significant difference in improving hair density. It concluded that oral minoxidil can be used as an adjunct or a second-line treatment option. The important difference is regulatory: topical minoxidil is FDA-approved for hair loss, while oral minoxidil for hair loss is off-label.</p>
<h3>Topical minoxidil, the approved option</h3>
<p>Topical minoxidil comes as a liquid or foam you apply to the scalp, and it's available without a prescription. The ${ext(S.aadMale, "AAD")} calls it the most commonly used treatment for male pattern hair loss and says that in clinical trials it has reduced hair loss, stimulated growth and strengthened existing strands, though full regrowth is unlikely. For women, the ${ext(S.aadFemale, "AAD")} says products containing 2% or 5% minoxidil have been approved for female pattern hair loss and that minoxidil is the most-recommended treatment. Common side effects are an irritated, itchy or flaky scalp; the AAD notes that the foam formulation seems to reduce irritation.</p>
<h3>Oral minoxidil, the off-label option</h3>
<p>Oral minoxidil is a tablet originally developed for blood pressure. ${ext(S.ldomSafety, "A March 2025 review in the Journal of Clinical Medicine")} notes that it's only FDA-approved for severe, treatment-resistant high blood pressure, at much higher doses than are used for hair, and that low-dose oral minoxidil has become one of the most widely used off-label treatments for several types of alopecia. People who struggle with the daily routine of a topical, or whose scalp reacts to it, often ask about it.</p>
<table><thead><tr><th></th><th>Topical minoxidil</th><th>Low-dose oral minoxidil</th></tr></thead><tbody>
<tr><td>FDA status for hair loss</td><td>Approved, over the counter</td><td>Off-label; prescription only</td></tr>
<tr><td>How you use it</td><td>Applied to the scalp, once or twice daily depending on the product</td><td>A tablet, as prescribed</td></tr>
<tr><td>Most common side effects</td><td>Scalp irritation, itching, flaking; unwanted facial hair if it spreads</td><td>Unwanted hair growth on face and body; less often fluid retention, faster heartbeat, dizziness</td></tr>
<tr><td>Main advantages</td><td>FDA-approved; applied only where it's needed</td><td>Easier routine; no residue or scalp reaction</td></tr>
<tr><td>Who should be cautious</td><td>People with very sensitive scalps</td><td>People with heart conditions, low blood pressure or on blood-pressure medicines</td></tr>
<tr><td>Pregnancy and breastfeeding</td><td>Avoid, per the AAD</td><td>Avoid; discuss with a clinician</td></tr>
</tbody></table>
<p>Neither form works if you stop. ${ext(S.mlMinoxidil, "MedlinePlus")} says most new hair is lost within a few months after topical minoxidil is stopped. Our detailed comparison of <a href="/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil">oral vs topical minoxidil</a> goes further, and <a href="/hair-loss/articles/oral-minoxidil-online">oral minoxidil online</a> explains how to get a prescription through telehealth. If you want to know what to expect from the topical version specifically, see <a href="/hair-loss/articles/does-minoxidil-work">does minoxidil work</a>.</p>`,
    },
    {
      heading: "Is low-dose oral minoxidil safe for hair loss?",
      body: `<p>For most carefully selected patients, low-dose oral minoxidil appears to be well tolerated, but it's an off-label use of a blood-pressure medicine, so it needs a proper medical review and some monitoring. ${ext(S.ldomSafety, "A March 2025 narrative review in the Journal of Clinical Medicine")}, which searched the published literature up to the end of 2024, describes its safety profile as favorable and summarizes the side effects like this:</p>
<ul>
<li><strong>Unwanted hair growth (hypertrichosis)</strong> is the most frequent side effect, occurring in roughly 15% of patients, more often in women and at higher doses.</li>
<li><strong>Fluid retention</strong> affects about 1.3% to 10% of patients, particularly women, and typically appears within the first one to three months.</li>
<li><strong>Faster heartbeat or dizziness</strong> occurs in fewer than 5% of cases and is usually mild and temporary.</li>
<li><strong>Severe events</strong>, such as fluid around the heart (pericardial effusion), are extremely rare and often linked to compounding errors that produced an excessive dose.</li>
</ul>
<p>The review adds that most side effects resolve without stopping treatment, often after a dose change, and that careful patient selection, gradual dose adjustment and monitoring are essential. That last line is the practical takeaway: this isn't a medicine to take from a friend's leftover bottle or an unverified overseas site.</p>
<h3>Questions a good prescriber will ask</h3>
<ul>
<li>Do you have any heart condition, chest pain, or a history of fluid build-up?</li>
<li>Do you already take medicine for blood pressure, or is your blood pressure on the low side?</li>
<li>Are you pregnant, planning a pregnancy, or breastfeeding?</li>
<li>Do you take other medicines that affect heart rate or blood pressure?</li>
<li>Are you losing weight quickly, for example on a GLP-1 medicine, which can also lower blood pressure?</li>
</ul>
<p>If a service prescribes oral minoxidil without asking anything like this, treat that as a warning sign. The topical label's warnings give a sense of what to watch for, too: ${ext(S.mlMinoxidil, "MedlinePlus")} tells people using topical minoxidil to call a doctor immediately for rapid heartbeat, chest pain, lightheadedness, sudden weight gain, swelling of the face, ankles, hands or stomach, or difficulty breathing, especially when lying down.</p>
<h3>Is an approved oral minoxidil coming?</h3>
<p>Possibly. Veradermics is developing VDPHL01, an extended-release oral minoxidil. On October 19, 2026 the company ${ext(S.vd304, "reported that its phase 3 Study 304")} in 536 men met both co-primary endpoints, and ${ext(S.vdMedscape, "Medscape reported on October 22, 2026")} that the company hadn't shared its FDA filing plans. It isn't approved or available yet. Our <a href="/hair-loss/articles/veradermics-vdphl01">VDPHL01 guide</a> tracks the results and timeline. Until then, oral minoxidil for hair loss remains an off-label prescription.</p>`,
    },
    {
      heading: "What is topical finasteride, and is it safer than the pill?",
      body: `<p>Topical finasteride is finasteride applied to the scalp as a spray, solution or gel, usually with the aim of getting the hair benefit with less of the drug reaching the rest of the body. Trial data for one manufactured spray are encouraging, but in the US there's no FDA-approved topical finasteride, and what telehealth services sell is compounded. That distinction matters a great deal.</p>
<h3>What the best trial showed</h3>
<p>${ext(S.topicalFinTrial, "A randomized phase III trial published in the Journal of the European Academy of Dermatology and Venereology")} (online October 2021) tested a topical finasteride spray in 458 men at 45 European sites over 24 weeks. Hair count rose significantly more with the spray than with placebo (an adjusted mean of 20.2 hairs vs 6.7), and the result was numerically similar to oral finasteride. Peak finasteride levels in the blood were more than 100 times lower than with the pill, and serum DHT fell by 34.5% compared with 55.6% on oral finasteride. The authors concluded that lower systemic exposure makes sexual side effects related to DHT reduction less likely. That's a manufactured product tested in a controlled trial; it isn't the same thing as a custom-compounded topical in the US.</p>
<h3>What the FDA warned about</h3>
<p>On April 22, 2025, the ${ext(S.fdaTopicalFin, "FDA alerted health care providers, compounders and consumers")} to potential risks with compounded topical finasteride. The key points:</p>
<ul>
<li>There is no FDA-approved topical finasteride, alone or combined with other ingredients, and compounded drugs haven't been evaluated by the FDA for safety, effectiveness or quality.</li>
<li>The agency received 32 adverse-event reports between 2019 and 2024, describing effects consistent with oral finasteride's, including erectile dysfunction, anxiety, suicidal thoughts, brain fog, depression, fatigue, insomnia, decreased libido and testicular pain. Most reports said the effects continued after stopping.</li>
<li>Some patients said prescribers told them there was no risk because the product was topical. The FDA's point is that absorption through the skin is expected.</li>
<li>Topicals add their own risks: local irritation and a greater chance of accidental transfer to others, specifically females, which matters because finasteride is contraindicated in pregnancy.</li>
</ul>
<h3>So should you avoid it?</h3>
<p>Not necessarily, but go in with open eyes. If you're considering a compounded topical with finasteride, ask the provider which pharmacy makes it, what it contains and at what strength, what side effects to watch for, and how to avoid transferring it to a partner or children. A provider who answers those questions clearly is doing its job. One who tells you a topical has "no side effects" is repeating exactly what the FDA flagged.</p>
<p>Our guide to <a href="/hair-loss/articles/topical-finasteride">topical finasteride</a> covers who sells it and how the products differ, and our <a href="/hair-loss/articles/new-hair-loss-treatments-pipeline">new treatments pipeline</a> follows the manufactured versions.</p>`,
    },
    {
      heading: "Do combination topicals and compounded formulas work better?",
      body: `<p>Combining treatments that work in different ways generally does better than using one alone, and that's the idea behind the custom topicals many online providers sell. The evidence is strongest for topical minoxidil combined with finasteride. ${ext(S.comboTopicalMeta, "An October 2025 meta-analysis in Frontiers in Medicine")} pooled seven randomized trials with 396 men and found that a topical minoxidil-finasteride combination beat minoxidil alone on hair density, hair diameter and global photo assessment, with moderate-certainty evidence for the main outcomes. The authors also called for larger, standardized trials to confirm long-term results.</p>
<p>The broader picture points the same way. ${ext(S.fdaApprovedReview, "The November 2025 review in the International Journal of Molecular Sciences")} notes that combining some drugs has produced better outcomes than each drug alone, which it attributes to acting on several mechanisms at the same time.</p>
<h3>What's typically in a compounded hair formula</h3>
<ul>
<li><strong>Minoxidil</strong>, the growth-phase support, sometimes at strengths above typical over-the-counter products.</li>
<li><strong>Finasteride or dutasteride</strong>, to reduce DHT at the scalp. Neither is FDA-approved as a topical.</li>
<li><strong>Tretinoin or retinoic acid</strong>, a vitamin A derivative sometimes added alongside minoxidil.</li>
<li><strong>An anti-inflammatory or anti-itch ingredient</strong>, such as hydrocortisone or fexofenadine, intended to calm the scalp.</li>
<li><strong>Ketoconazole</strong>, an antifungal, in some formulas.</li>
</ul>
<h3>How the providers we rank use them</h3>
<p>All three of our top-ranked providers sell combination products, according to our verified provider records (August 2026):</p>
<ul>
<li><a href="/hair-loss/reviews/maximus">Maximus</a> offers a compounded All-in-One Gel with dutasteride, minoxidil, tretinoin and fexofenadine, plus separate Minoxidil+ and Dutasteride+ gels.</li>
<li><a href="/hair-loss/reviews/happyhead">Happy Head</a> offers a personalized Custom Topical with dutasteride, minoxidil (its topicals go up to 8%), retinoic acid and hydrocortisone, with actives adjustable after medical review.</li>
<li><a href="/hair-loss/reviews/petermd">PeterMD</a> offers Follicure RX, a spray combining minoxidil, finasteride and ketoconazole; it's the only topical in our ranking that adds ketoconazole.</li>
</ul>
<h3>The trade-offs to know</h3>
<p>Compounded formulas aren't FDA-approved, so their quality depends on the pharmacy that makes them, and the ${ext(S.fdaTopicalFin, "FDA's April 2025 alert")} on topical finasteride applies to any compounded topical containing it. A combination product also makes it harder to tell which ingredient is causing a side effect if you get one. The upside is convenience: one application instead of two or three. A good provider will explain each active in your formula, why it's there, and what to report. If a provider can't tell you what's in your bottle, that's a reason to look elsewhere.</p>
<p>For the classic pairing of the two approved drugs, see <a href="/hair-loss/articles/finasteride-and-minoxidil-together">can you take finasteride and minoxidil together</a>.</p>`,
    },
    {
      heading: "What is the best shampoo for hair loss?",
      body: `<p>No shampoo regrows hair on its own, but a ketoconazole shampoo is the one with a reasonable case as a supporting act, especially if you have dandruff or an inflamed, flaky scalp. Shampoo sits on your scalp for seconds before being rinsed away, which is a poor way to deliver a treatment to the follicle. The treatments with real evidence for pattern hair loss, minoxidil and finasteride, work because they stay in contact with the scalp or circulate through the body continuously.</p>
<h3>Why ketoconazole is the exception people mention</h3>
<p>Ketoconazole is an antifungal used for seborrheic dermatitis, the condition behind most stubborn dandruff. ${ext(S.fdaApprovedReview, "The November 2025 International Journal of Molecular Sciences review")} notes that ketoconazole shampoo was found in research to enhance finasteride's effect by lowering DHT levels in the male scalp. That's a supporting role alongside real treatment, not a replacement for it. Ketoconazole also treats the scalp conditions that can make hair loss worse. ${ext(S.mlHairLoss, "MedlinePlus")} notes, for example, that scalp ringworm (tinea capitis) is treated with an antifungal shampoo plus oral medicine, because creams and lotions may not reach deep enough into the follicles.</p>
<h3>What about "DHT-blocking" and thickening shampoos?</h3>
<p>Shampoos marketed as DHT blockers borrow the language of finasteride without its evidence. Thickening and volumizing shampoos are a different and more honest product: they coat the hair strand so it looks fuller for the day. There's nothing wrong with using one, as long as you know you're buying a cosmetic effect, not a treatment.</p>
<h3>A sensible shampoo routine for thinning hair</h3>
<ul>
<li>Use a gentle shampoo you like; harsh products and heavy styling can damage hair, as the ${ext(S.aadCauses, "AAD")} warns in its list of hair-loss causes.</li>
<li>If you have flaking or itching, ask about a ketoconazole shampoo a few times a week, or as your clinician suggests.</li>
<li>Don't stop washing your hair to "save" it. Normal shedding is 50 to 100 hairs a day, according to the ${ext(S.aadShedding, "AAD")} and the ${ext(S.nhs, "NHS")}, and hairs you see in the drain after a few days without washing were going to fall anyway.</li>
<li>Keep your actual treatment going. A shampoo is the supporting act; minoxidil or finasteride, if your clinician recommends them, is the main event.</li>
</ul>
<h3>Where to get one</h3>
<p>Some online providers bundle a ketoconazole shampoo or include ketoconazole in a topical. In our records, <a href="/hair-loss/reviews/keeps">Keeps</a> sells hair-care products such as ketoconazole shampoo, and <a href="/hair-loss/reviews/petermd">PeterMD</a>'s Follicure RX spray includes ketoconazole alongside minoxidil and finasteride. Our honest guide to whether <a href="/hair-loss/articles/do-hair-loss-shampoos-work">hair loss shampoos work</a> covers the ingredients in more detail.</p>`,
    },
    {
      heading: "Do laser caps and red light therapy work for hair loss?",
      body: `<p>Low-level laser or light therapy (LLLT), delivered through caps, helmets, combs and bands, has reasonable evidence for a modest benefit in pattern hair loss, but results vary and you have to keep using it. ${ext(S.llltMeta, "A 2021 systematic review and meta-analysis in the Journal of Clinical and Aesthetic Dermatology")} looked specifically at FDA-cleared home-use devices. It found that only 32 home-use LLLT devices had been cleared as of January 2020, pooled seven double-blind, sham-controlled trials, and reported a significant increase in hair density compared with sham devices, in both men and women and with both comb and helmet designs. The authors concluded LLLT is potentially effective and called for longer follow-up studies.</p>
<h3>Cleared isn't the same as approved</h3>
<p>The ${ext(S.aadMale, "AAD")} points out that when a laser device says "FDA cleared," it means the FDA recognizes it as a safe treatment, and that the requirements for clearance are much less stringent than for approval. In practice, that means you should look for a device with its own published, sham-controlled trial, not just a clearance badge.</p>
<h3>What the AAD says for women</h3>
<p>The ${ext(S.aadFemale, "AAD's female pattern hair loss guide")} says a few studies show laser devices can be effective for female pattern hair loss, that you must keep using a device to keep results, and that it's not yet known whether they're safe for long-term use or keep producing new growth.</p>
<h3>Where LLLT fits</h3>
<ul>
<li><strong>As an add-on:</strong> many people use a device alongside medicine rather than instead of it.</li>
<li><strong>As an alternative:</strong> for someone who can't or won't use medicines, it's one of the better-supported non-drug options.</li>
<li><strong>What to check:</strong> FDA clearance, published sham-controlled data for that specific device, a clear return policy, and a routine you'll realistically stick with for months.</li>
</ul>
<p>${ext(S.regrowthNma, "The 2023 network meta-analysis in Frontiers in Medicine")} also included a laser comb among the treatments it compared and found it produced significant terminal-hair regrowth at 24 weeks, with regrowth rates tending to slow after about 12 weeks. As with every option here, starting earlier and staying consistent matter more than the specific gadget.</p>`,
    },
    {
      heading: "Are PRP, microneedling or a hair transplant worth it?",
      body: `<p>These in-clinic options can help some people, but they're add-ons or later steps rather than the place most people should start. PRP has encouraging but low-quality evidence; microneedling is mainly discussed as a companion to minoxidil; and a hair transplant can give permanent, natural-looking results for good candidates, though it still needs medicine to protect the hair around it.</p>
<h3>PRP (platelet-rich plasma)</h3>
<p>PRP uses your own blood. It's drawn, spun in a machine to concentrate the platelets, and injected into the scalp. The ${ext(S.aadMale, "AAD")} describes a typical schedule of monthly sessions for the first three months and then a session every three to six months, says PRP is not a permanent solution, and notes that within a few months it can help lessen hair loss, with some patients then seeing thickening or regrowth. ${ext(S.prpMeta, "A July 2024 meta-analysis in Anais Brasileiros de Dermatologia")} pooled 13 randomized trials and found PRP increased hair density, but it rated the studies as highly heterogeneous, low quality and affected by publication bias, and called for better trials. The ${ext(S.aadFemale, "AAD's guidance for women")} is similarly cautious: early findings show promise, but more studies are needed.</p>
<h3>Microneedling</h3>
<p>Microneedling uses fine needles, in a roller or pen, to create tiny punctures in the scalp. It's usually discussed as a way to boost a topical such as minoxidil rather than as a treatment by itself, and technique and hygiene matter a lot when doing it at home. Our <a href="/hair-loss/articles/microneedling-for-hair-loss">microneedling guide</a> covers what's known and the safety caveats.</p>
<h3>Hair transplant</h3>
<p>Modern transplants move healthy hairs a few at a time rather than in the "plugs" of decades past. The ${ext(S.aadTransplant, "AAD's transplant guide")} explains that:</p>
<ul>
<li>You need two things to be a candidate: enough healthy donor hair, and a thinning area that can still grow hair.</li>
<li>Surgery typically takes four to eight hours, and most patients stay awake with a numbed scalp.</li>
<li>Transplanted hair normally falls out two to eight weeks after surgery, and most patients see results six to nine months later, some after 12 months.</li>
<li>Men in their twenties may be asked to wait and start a hair-loss medicine first.</li>
<li>Medicine helps keep results, because hair loss and thinning can continue after a transplant.</li>
</ul>
<p>That last point is the one people miss. A transplant moves hair; it doesn't stop the surrounding native hair from thinning. Our guide to <a href="/hair-loss/articles/hair-transplant-vs-medication">hair transplant vs medication</a> explains why medication almost always comes first. ${ext(S.mlMalePattern, "MedlinePlus")} also warns against two outdated approaches: suturing hairpieces to the scalp, which can cause scarring and infection, and artificial-fiber hair implants, which it says were banned by the FDA because of high infection rates.</p>`,
    },
    {
      heading: "How do you choose a trustworthy online hair loss provider?",
      body: `<p>A trustworthy online hair-loss provider does five things: a licensed clinician reviews your medical history before prescribing, the pharmacy that fills your prescription is named and licensed, prices are published with their conditions, cancellation terms are clear, and there's a public record of how the service treats people. Those are the five checks we use when we rank providers, and they're the quickest way to evaluate any online hair-loss service, including ones we don't cover.</p>
<h3>What the AAD recommends for online clinics</h3>
<p>The ${ext(S.aadQuality, "American Academy of Dermatology's guide to getting quality care from online clinics")} (updated June 2023) gives patients a practical list:</p>
<ul>
<li><strong>Find out who you'll see.</strong> The AAD recommends consulting a board-certified dermatologist, or another licensed doctor, who is licensed in your state, and asking for credentials. If a clinic won't provide them, it suggests finding one that will.</li>
<li><strong>Make sure you can submit photos.</strong> Without them, an accurate diagnosis is difficult.</li>
<li><strong>Ask about in-person follow-up.</strong> Check whether the service can arrange an in-person visit with a dermatologist near you if you need one.</li>
<li><strong>Share your medical history, and get a record.</strong> A quality service lets you share medications and allergies and gives you a record of the consultation for your own doctor.</li>
</ul>
<h3>What the FDA says about buying prescription medicine online</h3>
<p>The ${ext(S.fdaOnlinePharmacy, "FDA's BeSafeRx guidance")} says an online pharmacy is likely safe if it always requires a prescription, provides a US physical address and phone number, has a licensed pharmacist available to answer questions, and is licensed with a state board of pharmacy. Its warning signs include not requiring a prescription, prices that seem too good to be true, medicine that looks different from what you'd get locally or arrives damaged or expired, and unclear protection of your personal and financial information.</p>
<h3>Our quick checklist</h3>
<ol>
<li>Does a licensed clinician review your answers and photos before anything is prescribed?</li>
<li>Does the provider say which treatments are FDA-approved for hair loss and which are off-label or compounded?</li>
<li>Can you message a clinician about side effects after you start?</li>
<li>Are prices, billing frequency and renewal terms shown before checkout?</li>
<li>Can you pause or cancel easily, and are refund terms written down?</li>
<li>Does it ship discreetly, and does its privacy policy say how your health data is used?</li>
</ol>
<p>Nothing on that list is exotic, and the providers we rank meet the core of it: each uses licensed medical review before prescribing and publishes its prices. Where they differ is in treatment range, personalization and who they serve, which is what the comparison below is for. Our three highest-ranked online hair-loss providers are below.</p>`,
    },
    // __SECTIONS__
  ],
};
