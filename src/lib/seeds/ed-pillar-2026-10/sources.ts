// Sources for the ED pillar guide. Every clinical statement in the pillar
// links one of these inline, with the date it was checked. Agency and
// label-level sources first; the guideline, consensus and trial literature
// where the pillar reports a figure from it, labelled as reported.
export const CHECKED = "October 27, 2026";

export const SRC = {
  niddkEd: "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction",
  niddkCauses: "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/symptoms-causes",
  niddkTreatment: "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/treatment",
  niddkDiabetes: "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/sexual-bladder-problems",
  niddkArchived: "https://webarchive.library.unt.edu/web/20130217071201/http:/kidney.niddk.nih.gov/KUDiseases/pubs/ED/index.aspx",
  mmas: "https://pubmed.ncbi.nlm.nih.gov/8254833/",
  aua: "https://www.auanet.org/documents/Guidelines/PDF/ED-JU.pdf",
  auaJournal: "https://www.auajournals.org/doi/10.1016/j.juro.2018.05.004",
  princeton: "https://www.sciencedirect.com/science/article/abs/pii/S0025619624002763",
  princetonJsm: "https://academic.oup.com/jsm/article/21/2/90/7499332",
  acc: "https://www.acc.org/latest-in-cardiology/articles/2024/09/23/10/45/erectile-disfunction-as-an-ascvd-risk-enhancing-factor",
  sildenafil: "https://medlineplus.gov/druginfo/meds/a699015.html",
  tadalafil: "https://medlineplus.gov/druginfo/meds/a604008.html",
  vardenafil: "https://medlineplus.gov/druginfo/meds/a603035.html",
  avanafil: "https://medlineplus.gov/druginfo/meds/a614010.html",
  alprostadil: "https://medlineplus.gov/druginfo/meds/a695022.html",
  viagraLabel: "https://labeling.pfizer.com/ShowLabeling.aspx?id=652",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding/consumer-and-health-care-professional-information",
  fdaHiddenRisks: "https://www.fda.gov/consumers/consumer-updates/hidden-risks-erectile-dysfunction-treatments-sold-online",
  fdaTainted: "https://www.fda.gov/drugs/medication-health-fraud/tainted-sexual-enhancement-and-energy-products",
  fdaBeSafeRx: "https://www.fda.gov/drugs/quick-tips-buying-medicines-over-internet/besaferx-your-source-online-pharmacy-information",
  nabp: "https://safe.pharmacy/buy-safely/",
  finkMeta: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/211714",
  pde5Compare: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1343572/",
  hopkinsProstate: "https://www.hopkinsmedicine.org/health/conditions-and-diseases/prostate-cancer/erectile-dysfunction-after-prostate-cancer",
  postRpReview: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5304365/",
  mayoCare: "https://www.mayoclinic.org/diseases-conditions/erectile-dysfunction/care-at-mayo-clinic/mac-20355786",
  mayoCauses: "https://www.mayoclinic.org/diseases-conditions/erectile-dysfunction/symptoms-causes/syc-20355776",
  liswtReview: "https://www.nature.com/articles/s41443-019-0132-0",
};

export const ext = (href: string, label: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

export const src = (href: string, label: string) => `${ext(href, label)}, checked ${CHECKED}`;
