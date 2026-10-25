import type { ProviderReviewRecord } from "./types";
import type { TrustpilotReview } from "@/lib/config";

// ───── Customer-review themes ─────
// The "What customers say" block on each review page. Every theme lists the
// stored reviews that mention it, by reference (reviewer name + displayed
// date, exactly as stored in the provider's record), and the page derives the
// count from those references. A reference that does not resolve to a stored
// review is dropped at render time, so a count can never exceed what the
// registry actually holds. One review can count toward several themes.
//
// Written by reading every stored review (Oct 25, 2026). Add the newest
// batch's reviews to the themes when a batch is added.

export interface ReviewTheme {
  label: string;
  /** One or two sentences, in plain words, describing what those reviews say. */
  detail: string;
  /** "Name|Displayed date" keys of the stored reviews that mention this theme. */
  refs: string[];
  /** One of the refs to quote (verbatim excerpt) under the theme. */
  quote?: string;
}

export interface ProviderThemes {
  praise: ReviewTheme[];
  criticism: ReviewTheme[];
  /** Anything the reader should know about this provider's set (e.g. the profile covers other products). */
  note?: string;
}

export const reviewKey = (r: TrustpilotReview) => `${r.name}|${r.date ?? "undated"}`;

export interface ResolvedTheme extends ReviewTheme {
  count: number;
  quoted?: TrustpilotReview;
}

export function resolveThemes(
  record: ProviderReviewRecord,
  themes: ProviderThemes,
): { praise: ResolvedTheme[]; criticism: ResolvedTheme[]; total: number } {
  const byKey = new Map<string, TrustpilotReview>();
  let total = 0;
  for (const b of record.batches)
    for (const r of b.reviews) {
      total++;
      if (!byKey.has(reviewKey(r))) byKey.set(reviewKey(r), r);
    }
  const resolve = (t: ReviewTheme): ResolvedTheme => {
    const matched = t.refs.filter((k) => byKey.has(k));
    const quoted = t.quote && byKey.has(t.quote) ? byKey.get(t.quote) : undefined;
    return { ...t, count: matched.length, quoted };
  };
  return {
    praise: themes.praise.map(resolve).filter((t) => t.count > 0),
    criticism: themes.criticism.map(resolve).filter((t) => t.count > 0),
    total,
  };
}

export const REVIEW_THEMES: Record<string, ProviderThemes> = {
  embody: {
    praise: [
      {
        label: "Nurses and providers who listen and explain",
        detail:
          "By far the most common thing embody reviewers write about: a nurse or provider who took time, answered everything, adjusted the dose when asked, and called back when a video link failed.",
        refs: [
          "Renay S.|Oct 25, 2026", "Melanie A.|Oct 25, 2026", "Tiffany D.|Oct 25, 2026", "Sharon K.|Oct 25, 2026", "Cindy M.|Oct 25, 2026",
          "Carolyn S.|Oct 25, 2026", "Wendy|Oct 25, 2026", "Estill P.|Oct 25, 2026", "Judy C.|Oct 25, 2026", "xbrujaa|Oct 25, 2026",
          "Misty B.|Oct 25, 2026", "Carrie G.|Oct 25, 2026", "Beth|Oct 25, 2026", "Shaun S.|Oct 25, 2026", "CB|Oct 25, 2026",
          "Brenda|Oct 25, 2026", "Germill M.|Oct 25, 2026", "Ann C.|Oct 25, 2026", "Tamrin B.|Oct 25, 2026", "Jessica W.|Oct 24, 2026",
          "Kristi|Oct 24, 2026", "Kim W.|Oct 23, 2026", "Virginia|Oct 23, 2026", "Mikaelly M.|Sep 23, 2026", "Yvette|Sep 23, 2026",
          "Jennifer D.|Sep 23, 2026", "Patti N.|Sep 23, 2026", "Frances O.|Sep 23, 2026", "Michelle L.|Sep 22, 2026", "Sandralee D.|Sep 21, 2026",
          "Carole H.|Sep 21, 2026", "Jeri B.|Sep 20, 2026", "Amanda G.|undated", "Amy F.|undated", "Ann K.|undated",
          "Kelli|undated", "Jeanie|Aug 10, 2026", "Sandra M.|Aug 10, 2026", "Jennifer P.|Aug 10, 2026", "Stephanie W.|Aug 10, 2026",
          "Delilah R.|Aug 9, 2026", "Cynthia G.|Aug 9, 2026", "Roberta R.|Jul 3, 2026",
        ],
        quote: "Misty B.|Oct 25, 2026",
      },
      {
        label: "Support staff, often named, who fixed the problem",
        detail:
          "Reviewers thank specific team members for sorting out a portal issue, a billing question or a shipment, and several say chat connected them to a person straight away.",
        refs: [
          "Angela|Oct 25, 2026", "Michele K.|Oct 25, 2026", "Monica D.|Oct 25, 2026", "Danielle V.|Oct 25, 2026", "Claire F.|Oct 25, 2026",
          "John S.|Oct 24, 2026", "Rosa G.|Oct 24, 2026", "Lupita C.|Oct 24, 2026", "Linda|Oct 24, 2026", "Cynthia|Oct 23, 2026",
          "Elizabeth|Oct 23, 2026", "Danielle C.|Oct 23, 2026", "patti S.|Sep 16, 2026", "Vickie S.|Sep 23, 2026", "Jill W.|undated",
          "Rebecca K.|undated", "Michael T.|undated", "MM|undated", "Bryan T.|undated",
        ],
        quote: "John S.|Oct 24, 2026",
      },
      {
        label: "A price that stays flat",
        detail:
          "The flat monthly price, with no change at dose increases, is why several reviewers chose embody or could afford to go up a dose. One two-star reviewer still calls the pricing reasonable.",
        refs: [
          "Tiffany D.|Oct 25, 2026", "xbrujaa|Oct 25, 2026", "Mandie S.|Oct 25, 2026", "Tracy|Sep 21, 2026", "Ann K.|undated",
          "Tiffany C.|undated", "Cynthia G.|Aug 9, 2026", "George|Jul 11, 2026",
        ],
        quote: "Ann K.|undated",
      },
      {
        label: "Fast delivery and medication that works",
        detail:
          "Reviewers who report results mention 20 pounds in a month, 36 pounds by the third shot and 5 pounds in three weeks, and describe boxes arriving in two or three days with the cold packs still frozen.",
        refs: [
          "Claire F.|Oct 25, 2026", "Mary|Oct 25, 2026", "Elizabeth|Oct 23, 2026", "Beth B.|Oct 25, 2026", "Christina P.|Oct 25, 2026",
          "Teresa B.|undated", "MM|undated", "George|Jul 11, 2026", "Roberta R.|Jul 3, 2026",
        ],
        quote: "George|Jul 11, 2026",
      },
    ],
    criticism: [
      {
        label: "Orders that shipped late or not at all",
        detail:
          "The main complaint in the October reviews: a prepaid three-month order not received after a month, a refill held at the pharmacy while the reviewer ran out, a box sent to an old address, and earlier a first dose quoted at 3 to 5 days that took 8.",
        refs: [
          "Tabina D.|Oct 25, 2026", "Mandie S.|Oct 25, 2026", "Bill L.|Oct 24, 2026", "Mike|Oct 24, 2026", "Jessica S.|Oct 25, 2026",
          "Celtic|Sep 21, 2026", "Christy F.|Oct 25, 2026",
        ],
        quote: "Celtic|Sep 21, 2026",
      },
      {
        label: "Refunds refused and disputed charges",
        detail:
          "Reviewers who say they received no medication were refused refunds under the no-refund policy, and two describe charges for something that never arrived.",
        refs: [
          "Tabina D.|Oct 25, 2026", "Christy F.|Oct 25, 2026", "Jessica S.|Oct 25, 2026", "Mike|Oct 24, 2026", "Michelle G.|Sep 23, 2026",
          "Jeff M.|Oct 25, 2026",
        ],
        quote: "Christy F.|Oct 25, 2026",
      },
      {
        label: "Dose or order changes nobody agreed to",
        detail:
          "The most serious complaints: a prescription that arrived at roughly triple the expected dose, a next order placed at a different dose than discussed, and a formulation mixed with NAD unless you ask otherwise.",
        refs: ["Courtney S.|Oct 25, 2026", "Jeff M.|Oct 25, 2026", "Geraldine P.|Oct 23, 2026"],
        quote: "Jeff M.|Oct 25, 2026",
      },
      {
        label: "Reaching a person when something goes wrong",
        detail:
          "Chat that loops, unreturned calls, a doctor who missed three video slots, and a subscription cancelled without notice. Several of these reviewers say it ended well once a nurse or account manager called.",
        refs: [
          "Courtney S.|Oct 25, 2026", "Jeff M.|Oct 25, 2026", "RL|Oct 25, 2026", "Beth|Oct 25, 2026", "Bill L.|Oct 24, 2026",
          "Vickie S.|Sep 23, 2026", "patti S.|Sep 16, 2026", "Josh|undated", "Bryan T.|undated", "customer|undated",
          "Kim|Sep 22, 2026", "Michelle G.|Sep 23, 2026",
        ],
        quote: "RL|Oct 25, 2026",
      },
    ],
  },

  wellmedr: {
    praise: [
      {
        label: "Support that answers and fixes it, usually by name",
        detail:
          "Two thirds of welludr's reviews are about a specific agent who answered the phone, reset a portal, reversed a charge or paused a plan. Reviewers repeatedly note that a human picked up quickly.",
        refs: [
          "Cindy S.|Oct 25, 2026", "Sharon|Oct 25, 2026", "Stephanie G.|Oct 25, 2026", "Audrey J.|Oct 25, 2026", "dbingram|Oct 25, 2026",
          "Kevin L.|Oct 25, 2026", "Grace R.|Oct 24, 2026", "Kathy T.|Oct 24, 2026", "Tracy|Oct 24, 2026", "Isaac M.|Oct 24, 2026",
          "Keri|Oct 24, 2026", "Beth Z.|Oct 24, 2026", "Shelley|Oct 23, 2026", "Angie C.|Oct 23, 2026", "Hollee W.|Oct 23, 2026",
          "Lisa C.|Oct 23, 2026", "Dell M.|Oct 24, 2026", "Raylene O.|Oct 23, 2026", "Taryn N.|Oct 23, 2026", "Jeff G.|Oct 23, 2026",
          "Maura L.|Oct 23, 2026", "Geraldine P.|Oct 23, 2026", "Alissa W.|Oct 23, 2026", "Kimberly C.|Oct 23, 2026", "Jessica S.|Oct 23, 2026",
          "S H|Oct 23, 2026", "Ashley|Oct 23, 2026", "Omar L.|Oct 23, 2026", "Kathy|Oct 23, 2026", "Tricia H.|Oct 23, 2026",
          "Willie M.|Oct 23, 2026", "TYM|Oct 23, 2026", "Melody|Oct 23, 2026", "Cynthia S.|Oct 23, 2026", "Ritta M.|Oct 23, 2026",
          "Chonte C.|Oct 23, 2026", "Tina|Oct 23, 2026", "Derek|Oct 23, 2026", "JoAnne S.|Oct 23, 2026", "Bonnie L.|Oct 23, 2026",
          "June B.|Oct 23, 2026", "Nandanie T.|Oct 3, 2026", "T. H.|Oct 3, 2026", "adrienne A.|Oct 4, 2026", "Stacey K.|Oct 4, 2026",
          "Lisa R.|Oct 4, 2026", "Nancy|Sep 26, 2026", "Eva R.|Sep 22, 2026", "Kelly|Sep 21, 2026", "Renee G.|Sep 20, 2026",
          "Veronica K.|Sep 20, 2026", "Jill|Sep 15, 2026", "Kristine S.|Sep 20, 2026", "Jeremy N.|Sep 22, 2026", "Emilie A.|Sep 18, 2026",
          "Robert|undated", "Alexis P.|undated", "Tammy H.|undated", "Scott C.|undated", "Gooie|undated",
          "Jessica|undated", "Sydney A.|Aug 10, 2026", "Deb Z.|Aug 10, 2026", "Donna J.|Aug 3, 2026", "Vicki L.|Oct 25, 2026",
          "Debra|Oct 25, 2026", "Kenjula B.|Sep 21, 2026",
        ],
        quote: "Tracy|Oct 24, 2026",
      },
      {
        label: "The price, and medication that works",
        detail:
          "Reviewers who switched from another provider say the set price with no membership fee is what they can afford, and several report reaching their goal or steady results.",
        refs: [
          "Jalinda|Oct 25, 2026", "Robert O.|Oct 25, 2026", "Amy R.|Oct 24, 2026", "Scott B.|Oct 23, 2026", "Raylene O.|Oct 23, 2026",
          "Ken|Oct 23, 2026", "Christina R.|Oct 23, 2026", "Tracey J.|Oct 23, 2026", "T. H.|Oct 3, 2026", "Deb Z.|Aug 10, 2026",
          "Jason C.|Sep 21, 2026", "julia A.|Aug 10, 2026",
        ],
        quote: "Tracey J.|Oct 23, 2026",
      },
      {
        label: "Fast approval and a cold, well-packed box",
        detail:
          "When the process runs as designed, reviewers describe approval and shipping within days and medication arriving cold.",
        refs: ["Jalinda|Oct 25, 2026", "Scott B.|Oct 23, 2026", "julia A.|Aug 10, 2026", "Amy R.|Oct 24, 2026", "Kristine S.|Sep 20, 2026"],
        quote: "Scott B.|Oct 23, 2026",
      },
    ],
    criticism: [
      {
        label: "Billing: the charge interval, double charges and a disputed quote",
        detail:
          "The most detailed complaint says a $99-a-month plan was charged every 21 days; an August reviewer says the same. Others report being charged twice for one order (reversed in the 5-star versions), a 3-month plan charged again after reinstatement, and a $39 quote that became $199 or $249. We have not verified the 21-day cadence; confirm the interval in writing before you prepay.",
        refs: [
          "DG|Oct 23, 2026", "Francisco|Aug 17, 2026", "Debbie S.|Oct 25, 2026", "Stephanie G.|Oct 25, 2026", "Bonnie L.|Oct 23, 2026",
          "Suzanne H.|Oct 23, 2026", "Eddie M.|Oct 25, 2026", "Raylene O.|Oct 23, 2026", "Ken|Oct 23, 2026", "Angie C.|Oct 23, 2026",
          "Chonte C.|Oct 23, 2026", "adrienne A.|Oct 4, 2026",
        ],
        quote: "DG|Oct 23, 2026",
      },
      {
        label: "Shipping delays and reorders that stall",
        detail:
          "An order marked approved then stuck in 'delay in shipping' for eight days, a reorder that took weeks and a BBB complaint, a refill scheduled to ship after the injection day, and a first delivery a month late. Several of these reviewers raised their rating after an operations manager called.",
        refs: [
          "Sandra T.|Oct 25, 2026", "Adam-Stephanie E.|Oct 25, 2026", "Kathleen W.|Sep 25, 2026", "Keidre|Sep 16, 2026", "Kelly|Sep 21, 2026",
          "Renee G.|Sep 20, 2026", "Veronica K.|Sep 20, 2026", "Jason C.|Sep 21, 2026", "Jeremy N.|Sep 22, 2026", "Kenjula B.|Sep 21, 2026",
        ],
        quote: "Keidre|Sep 16, 2026",
      },
      {
        label: "Slow or circular support before a person steps in",
        detail:
          "Chat and app messages that take days or loop between agents. Most of these reviews end with a named agent fixing it by phone, which is why several are still four or five stars.",
        refs: [
          "Sandra T.|Oct 25, 2026", "Jeff G.|Oct 23, 2026", "Jessica S.|Oct 23, 2026", "Scott B.|Oct 23, 2026", "Francisco|Aug 17, 2026",
          "Emery G.|Sep 22, 2026", "Kenjula B.|Sep 21, 2026", "Renee G.|Sep 20, 2026", "Jordan W.|Sep 23, 2026", "Christina L.|Sep 10, 2026",
          "Audrey J.|Oct 25, 2026",
        ],
        quote: "Jeff G.|Oct 23, 2026",
      },
      {
        label: "Results slower than hoped",
        detail: "One reviewer six months in says the weight loss has been small for the cost.",
        refs: ["Louise M.|undated"],
        quote: "Louise M.|undated",
      },
    ],
  },

  medvi: {
    praise: [
      {
        label: "Clinicians who take time on the phone and video visits",
        detail:
          "Most MEDVi reviews describe the visit itself: a nurse practitioner or doctor who was on time, not rushed, explained dosing and side effects, and adjusted the plan. Video visits with reminders come up often.",
        refs: [
          "Debra T.|Oct 25, 2026", "Christine P.|Oct 24, 2026", "Lynnette A.|Oct 24, 2026", "Phillis S.|Oct 24, 2026", "Christopher|Oct 23, 2026",
          "Brandy C.|Oct 23, 2026", "Rose|Oct 23, 2026", "Tammy|Oct 22, 2026", "A. A.|Oct 22, 2026", "Kelly M.|Oct 22, 2026",
          "Neale B.|Oct 22, 2026", "Jason B.|Oct 22, 2026", "Betty K.|Oct 22, 2026", "Wendy R.|Oct 21, 2026", "Tammy B.|Oct 21, 2026",
          "Tyler|Oct 21, 2026", "Cindy R.|Oct 21, 2026", "Michael S.|Oct 21, 2026", "Wade W.|Oct 21, 2026", "Jacqueline L.|Oct 21, 2026",
          "Robert S.|Oct 21, 2026", "Vicky H.|Oct 20, 2026", "KLL|Oct 20, 2026", "Eric B.|Sep 25, 2026", "Stephen V.|Sep 25, 2026",
          "Linda H.|Sep 25, 2026", "Crystal C.|Sep 24, 2026", "Maria A.|Sep 24, 2026", "Roxanne C.|Sep 22, 2026", "Shawn E.|Sep 21, 2026",
          "Vivian H.|Sep 5, 2026", "A Concerned First Time Consume|Aug 31, 2026", "Nan|Sep 23, 2026", "Michele S.|Sep 23, 2026", "Stev H.|Sep 22, 2026",
          "May L.|Sep 22, 2026", "Stephanie N.|Sep 22, 2026", "Alfred J.|Sep 22, 2026", "Jennifer P.|Sep 22, 2026", "Tracy H.|Sep 22, 2026",
          "Maurice R.|Sep 22, 2026", "Martin|Aug 7, 2026", "Richard|Aug 7, 2026", "Randy B.|Aug 7, 2026", "Traci F.|Aug 7, 2026",
          "DB|undated", "Raymond S.|undated", "lisa E.|undated", "Brian|undated", "Ashley|Aug 10, 2026",
          "Scott C.|Aug 10, 2026", "Rena|Aug 10, 2026", "Veronica|Aug 7, 2026", "Greg R.|Jul 28, 2026", "John M.|Oct 21, 2026",
        ],
        quote: "Phillis S.|Oct 24, 2026",
      },
      {
        label: "Account reps and coaches named and thanked",
        detail:
          "A second group thanks a specific representative for appointments, renewals and follow-up calls; one says a new account rep turned a rocky start around.",
        refs: [
          "Michael|Oct 23, 2026", "Terre C.|Oct 22, 2026", "Katie E.|Oct 22, 2026", "Aly|Oct 22, 2026", "Alicia S.|Oct 22, 2026",
          "James W.|Oct 22, 2026", "customer|Oct 22, 2026", "Brenda B.|Oct 21, 2026", "John W.|Sep 24, 2026", "Sandra C.|Sep 23, 2026",
          "Kelly G.|Sep 23, 2026", "Veronica|Aug 7, 2026",
        ],
        quote: "Aly|Oct 22, 2026",
      },
      {
        label: "Affordable access and results",
        detail: "Reviewers call the access affordable and describe the program working, appetite curbed and a prior mistake corrected.",
        refs: ["Kelly G.|Sep 23, 2026", "Terre C.|Oct 22, 2026", "Nan|Sep 23, 2026", "Jennifer P.|Sep 22, 2026", "A Concerned First Time Consume|Aug 31, 2026"],
        quote: "Kelly G.|Sep 23, 2026",
      },
    ],
    criticism: [
      {
        label: "Medication late or not sent",
        detail:
          "A year-and-a-half customer two weeks without medication, two months of late shipments, a prepaid trial that kept charging without shipping, and an order billed but never sent. Two 5-star reviewers blame the pharmacy rather than MEDVi.",
        refs: [
          "Jim C.|Oct 22, 2026", "Mndy J.|Oct 22, 2026", "Diane S.|Oct 21, 2026", "Dan|Oct 22, 2026", "Kearsley R.|Sep 23, 2026",
          "Tammy B.|Oct 21, 2026", "Wendy R.|Oct 21, 2026",
        ],
        quote: "Diane S.|Oct 21, 2026",
      },
      {
        label: "Billing, cancellation and refunds",
        detail:
          "No online cancellation path, a yearly plan renewed without notice that took regulator complaints to refund, a refund promised then refused, and a monthly subscription that was hard to stop.",
        refs: [
          "Jim C.|Oct 22, 2026", "ENS SI|Oct 22, 2026", "Dan|Oct 22, 2026", "Chris W.|Sep 4, 2026", "Deborah D.|Sep 11, 2026",
          "Margaret D.|Sep 1, 2026", "Andy W.|Sep 22, 2026",
        ],
        quote: "Margaret D.|Sep 1, 2026",
      },
      {
        label: "Wrong dose shipped",
        detail:
          "Two reviewers transferring from another provider were sent a starting dose instead of their current one, and one says the correction never came; a 5-star reviewer says the doctor spotted and fixed the same mistake.",
        refs: ["Deborah D.|Sep 11, 2026", "N R|Sep 16, 2026", "Nan|Sep 23, 2026", "Mndy J.|Oct 22, 2026"],
        quote: "N R|Sep 16, 2026",
      },
      {
        label: "Support that goes quiet or sends canned replies",
        detail: "Communication that stopped after a good start, canned responses, and reps other than the one being praised showing little follow-through.",
        refs: [
          "Mndy J.|Oct 22, 2026", "Michael|Oct 23, 2026", "Aly|Oct 22, 2026", "Kearsley R.|Sep 23, 2026", "Andy W.|Sep 22, 2026",
          "N R|Sep 16, 2026", "Deborah D.|Sep 11, 2026",
        ],
        quote: "Andy W.|Sep 22, 2026",
      },
    ],
  },

  eden: {
    praise: [
      {
        label: "A support agent, named, who answered fast and fixed it",
        detail:
          "Almost every Eden review is a thank-you to a named support agent: Joanne, Lupe, Nathalie, Erin, Kim, Danifer and others, for a quick reply, an unpaused plan, a corrected mistake or a prescription sent to the pharmacy.",
        refs: [
          "Tj F.|Oct 25, 2026", "RJ|Oct 25, 2026", "Regina C.|Oct 25, 2026", "Jacqueline B.|Oct 25, 2026", "Holly D.|Oct 24, 2026",
          "Taylor L.|Oct 24, 2026", "Teresa B.|Oct 24, 2026", "Jeanette D.|Oct 24, 2026", "Cindy P.|Oct 23, 2026", "Felicia E.|Oct 23, 2026",
          "Danielle T.|Oct 23, 2026", "Rachel W.|Oct 23, 2026", "Michael L.|Oct 23, 2026", "Ashlie T.|Oct 23, 2026", "Glori L.|Oct 23, 2026",
          "customer|Oct 23, 2026", "Jeff G.|Oct 23, 2026", "Kristen S.|Oct 22, 2026", "Sarah P.|Oct 22, 2026", "Albriana|Oct 22, 2026",
          "Mary F.|Oct 22, 2026", "Nicole|Oct 22, 2026", "Lindsey Z.|Oct 22, 2026", "Perry A.|Oct 22, 2026", "Dianne B.|Oct 22, 2026",
          "Mary L.|Oct 22, 2026", "Julie W.|Oct 22, 2026", "Julie G.|Oct 21, 2026", "Alice|Oct 21, 2026", "Felicia R.|Oct 21, 2026",
          "EB|Oct 21, 2026", "John V.|Oct 21, 2026", "Stacia|Oct 21, 2026", "Carol|Oct 21, 2026", "Brittany W.|Oct 21, 2026",
          "Nicole|Oct 21, 2026", "Kensha F.|Oct 21, 2026", "Linda|Oct 21, 2026", "Rob|Oct 21, 2026", "Katelynn|Oct 21, 2026",
          "Tabitha B.|Oct 21, 2026", "Michelle A.|Oct 20, 2026", "Jay S.|Oct 20, 2026", "Danielle|Oct 20, 2026", "J M|Oct 20, 2026",
          "Lindsay P.|Oct 20, 2026", "Cala I.|Oct 20, 2026", "Louise B.|Oct 19, 2026", "me|Oct 19, 2026", "Molly P.|Oct 19, 2026",
          "Jamellah B.|Oct 19, 2026", "Malisa|Oct 18, 2026", "Blf|Oct 18, 2026", "Christina H.|Oct 18, 2026", "Brandi|Oct 17, 2026",
          "Jessica L.|Oct 12, 2026", "Amy B.|Oct 12, 2026", "Leanne|Oct 12, 2026", "Mary Lou J.|Oct 12, 2026", "Jenni|Oct 11, 2026",
          "Frances|Oct 8, 2026", "Tikvah|undated", "RC|Oct 1, 2026",
        ],
        quote: "Lindsey Z.|Oct 22, 2026",
      },
      {
        label: "The price, and delivery on time",
        detail:
          "Reviewers mention the $129 flat price, help finding the best pricing, and a first order delivered four days after ordering. Even one 1-star reviewer calls the pricing good.",
        refs: [
          "Jacqueline B.|Oct 25, 2026", "Kensha F.|Oct 21, 2026", "Blf|Oct 18, 2026", "Tikvah|undated", "Kenny|Oct 18, 2026",
          "Michael L.|Oct 23, 2026",
        ],
        quote: "Jacqueline B.|Oct 25, 2026",
      },
      {
        label: "A phone line with a real person when the AI chat falls short",
        detail: "Several reviewers say the portal's AI chat did not answer them, and that the phone line, with a short wait, did.",
        refs: ["Nicole|Oct 21, 2026", "Cala I.|Oct 20, 2026", "John V.|Oct 21, 2026", "Jacqueline B.|Oct 25, 2026", "EB|Oct 21, 2026"],
        quote: "Nicole|Oct 21, 2026",
      },
    ],
    criticism: [
      {
        label: "Cancelling, recurring charges and refunds",
        detail:
          "An hour-long wait to cancel, six months of recurring-payment problems ending in a refused refund, and a treatment cancelled by email two weeks after the last dose arrived.",
        refs: ["Jennie|Oct 21, 2026", "anon|Oct 20, 2026", "Kenny|Oct 18, 2026"],
        quote: "Jennie|Oct 21, 2026",
      },
      {
        label: "Orders and account issues that took repeated contact",
        detail:
          "Three consecutive orders needing around ten calls each, inconsistent shipments, an AI chat that promised to look into it and did not, and one call that ended without the promised link. One 5-star reviewer also notes she needed help on her account many times.",
        refs: ["Kenny|Oct 18, 2026", "anon|Oct 20, 2026", "Jay S.|Oct 20, 2026", "Nicole|Oct 21, 2026", "Mister M.|Oct 21, 2026"],
        quote: "Kenny|Oct 18, 2026",
      },
      {
        label: "The product itself",
        detail: "One two-word review calls the products inferior, with no detail.",
        refs: ["Mary H.|Oct 19, 2026"],
        quote: "Mary H.|Oct 19, 2026",
      },
    ],
  },

  ro: {
    praise: [
      {
        label: "Fast, easy sign-up and approval",
        detail:
          "The dominant theme: an online questionnaire that takes minutes, a response within hours, and approval the same day. Many of these reviews were written before the first shipment arrived.",
        refs: [
          "Nancy O.|Oct 25, 2026", "Orville H.|Oct 25, 2026", "Amanda S.|Oct 25, 2026", "Claire|Oct 25, 2026", "Scott S.|Oct 25, 2026",
          "Donna M.|Oct 25, 2026", "Chelsi|Oct 25, 2026", "Harley L.|Oct 25, 2026", "Bridget|Oct 25, 2026", "Connie G.|Oct 23, 2026",
          "Judy R.|Oct 23, 2026", "Janet|Oct 23, 2026", "Steve P.|Sep 24, 2026", "Marsha W.|Sep 21, 2026", "Carol|Sep 22, 2026",
          "Marsha|Sep 22, 2026", "Tony L.|Sep 22, 2026", "TKW|Aug 23, 2026", "Margaret B.|Aug 21, 2026", "Jessica P.|undated",
          "laura T.|undated", "Teresa|undated", "Nathan|Oct 24, 2026", "Jacklyn B.|Oct 25, 2026",
        ],
        quote: "Donna M.|Oct 25, 2026",
      },
      {
        label: "Clinicians who listen and quick answers",
        detail: "Reviewers describe the provider visit as thorough, like a primary-care appointment, and say questions were answered promptly.",
        refs: [
          "Jeff B.|Oct 25, 2026", "Nancy|Oct 25, 2026", "Marlene H.|Oct 25, 2026", "Melodie|Oct 25, 2026", "Janet|Oct 25, 2026",
          "Carol|Sep 22, 2026", "Marsha|Sep 22, 2026", "James C.|Sep 22, 2026", "Rebecca K.|undated", "Dawn C.|Oct 25, 2026",
          "Carlos M.|Oct 25, 2026",
        ],
        quote: "Carol|Sep 22, 2026",
      },
      {
        label: "Delivery within days",
        detail: "Medication in four days from starting the process, two days after approval, and one day with insurance.",
        refs: ["Orville H.|Oct 25, 2026", "Amanda S.|Oct 25, 2026", "qp|Oct 25, 2026", "Mary P.|Oct 23, 2026"],
        quote: "Mary P.|Oct 23, 2026",
      },
    ],
    criticism: [
      {
        label: "A membership fee on top of the medication",
        detail:
          "The most frequent complaint, from one- to four-star reviewers alike: a $39 first charge that turned out to be the consultation, then a monthly membership fee (quoted at $149) in addition to the medication, which several say was not clear before paying.",
        refs: [
          "William E.|Oct 25, 2026", "Bobbi F.|Oct 25, 2026", "Pandora H.|Oct 23, 2026", "Janet C.|Sep 22, 2026", "Shelly|Sep 20, 2026",
          "Norma P.|Sep 19, 2026", "Jim K.|Oct 24, 2026", "TKW|Aug 23, 2026", "Jennifer L.|Oct 25, 2026",
        ],
        quote: "Bobbi F.|Oct 25, 2026",
      },
      {
        label: "No phone number and slow messages",
        detail: "Reviewers wanting to cancel, expedite a delivery or ask a question could find only FAQs, with replies in two to three business days.",
        refs: ["Jennifer L.|Oct 25, 2026", "Lisa R.|Sep 21, 2026", "Elizabeth M.|Sep 22, 2026", "Gary G.|Sep 22, 2026", "Kay K.|Oct 25, 2026"],
        quote: "Lisa R.|Sep 21, 2026",
      },
      {
        label: "Delivery delays and a warm box",
        detail: "A delivery four days late with melted ice packs and no clear answer on whether to use it, plus shorter delays and missing tracking.",
        refs: ["Frank R.|Oct 25, 2026", "Gary G.|Sep 22, 2026", "John|Sep 22, 2026", "Robyn M.|Sep 21, 2026"],
        quote: "John|Sep 22, 2026",
      },
      {
        label: "Dosing decided before the conversation",
        detail:
          "Being restarted at the lowest dose after a higher one elsewhere, choosing a medication and being charged before any physician input, and a smaller starting dose than friends received.",
        refs: ["Sherry P.|Oct 25, 2026", "Tracy|Sep 21, 2026", "Shane D.|Sep 22, 2026", "Gary G.|Sep 22, 2026"],
        quote: "Tracy|Sep 21, 2026",
      },
      {
        label: "No results yet, and one reaction",
        detail: "No weight change after a week and a half, one reviewer who says nothing happened, and one allergic reaction with a refund request.",
        refs: ["Gordon K.|Oct 25, 2026", "Sonia|Oct 24, 2026", "Dossie D.|Oct 25, 2026"],
        quote: "Sonia|Oct 24, 2026",
      },
    ],
    note:
      "Ro's Trustpilot profile covers every Ro service, so a few of the stored reviews are about its eyelash and ED products rather than weight loss.",
  },

  trimrx: {
    praise: [
      {
        label: "Support and communication, when it works",
        detail:
          "A thorough screening, steady status emails from order to delivery, and reps who answer the same day. Reviewers who had this experience often contrast it with a previous provider that went quiet after payment.",
        refs: [
          "Patricia S.|Oct 24, 2026", "Dayna G.|Oct 21, 2026", "Lasharri W.|Oct 21, 2026", "Sean J.|Oct 21, 2026", "Eduard N.|Oct 20, 2026",
          "Elisa M.|Oct 21, 2026", "Mary O.|Sep 24, 2026", "James M.|Sep 23, 2026", "Jean B.|Sep 24, 2026", "Narine P.|Sep 23, 2026",
          "Herminia L.|Sep 23, 2026", "Michael H.|Sep 21, 2026", "Nadia T.|Jul 18, 2026", "Katrina C.|Jul 28, 2026", "Alejandro A.|Jul 17, 2026",
          "E. M.|Oct 19, 2026",
        ],
        quote: "Jean B.|Sep 24, 2026",
      },
      {
        label: "Quick, cold, plainly labelled delivery",
        detail: "Boxes in two to five days, arriving cold and sealed, with nothing on the label to give the contents away.",
        refs: [
          "Kenneth B.|Oct 22, 2026", "Dayna G.|Oct 21, 2026", "Sean J.|Oct 21, 2026", "James L.|Oct 21, 2026", "Titaayo Y.|Oct 19, 2026",
          "Hilari T.|Oct 18, 2026", "Jaime D.|Sep 23, 2026", "Nicholas H.|Sep 23, 2026", "Lisa C.|Jul 18, 2026", "Jessica J.|Jul 18, 2026",
          "Narine P.|Sep 23, 2026", "Lorene C.|Oct 18, 2026",
        ],
        quote: "Jaime D.|Sep 23, 2026",
      },
      {
        label: "A lower price than the previous provider or med spa",
        detail: "Reviewers who switched say they pay a half to a quarter of what they paid before, and that the pricing was clear at checkout.",
        refs: [
          "Elisa M.|Oct 21, 2026", "Juan B.|Oct 21, 2026", "Caden M.|Oct 20, 2026", "Jada S.|Oct 18, 2026", "Lorene C.|Oct 18, 2026",
          "Jerald W.|Sep 24, 2026", "Sharon B.|Sep 23, 2026", "Alain|Sep 23, 2026", "Supersaver Chic|Oct 20, 2026",
        ],
        quote: "Sharon B.|Sep 23, 2026",
      },
      {
        label: "Results",
        detail: "51 pounds, 41 pounds with blood pressure normalised, and steady losses reported by reviewers months in.",
        refs: [
          "Casey B.|Oct 23, 2026", "Juan B.|Oct 21, 2026", "Lorene C.|Oct 18, 2026", "Supersaver Chic|Oct 20, 2026", "Steve T.|Aug 3, 2026",
          "Nichole Y.|Jul 18, 2026", "E. M.|Oct 19, 2026",
        ],
        quote: "Steve T.|Aug 3, 2026",
      },
    ],
    criticism: [
      {
        label: "Prepaid multi-month orders that did not ship",
        detail:
          "The largest group of complaints: the second half of a 6-month plan a month late, a 3-month plan that delivered one vial, a first order not shipped after three weeks, and a 12-month plan with a $1,663.50 refund outstanding. Most say nobody answered.",
        refs: [
          "LJ|Oct 22, 2026", "Edward J.|Oct 23, 2026", "Jaiman|Oct 22, 2026", "Ileana V.|Oct 21, 2026", "Hester A.|Oct 19, 2026",
          "Lilia K.|Oct 19, 2026", "Karen A.|Sep 21, 2026", "Rosana O.|Oct 22, 2026", "Daniel A.|Oct 22, 2026",
        ],
        quote: "LJ|Oct 22, 2026",
      },
      {
        label: "Charges after cancelling, and refunds not issued",
        detail:
          "A $909 refill charged four months after a confirmed cancellation, a card charged before final approval, a financed plan still billing after cancellation, and refunds promised but not paid.",
        refs: [
          "Kathy|Oct 22, 2026", "Ken K.|Oct 22, 2026", "Rosana O.|Oct 22, 2026", "Alice R.|Oct 20, 2026", "George L.|Sep 23, 2026",
          "Ileana V.|Oct 21, 2026", "Edward J.|Oct 23, 2026",
        ],
        quote: "Ken K.|Oct 22, 2026",
      },
      {
        label: "An AI phone line and unanswered messages",
        detail:
          "The complaint that ties the others together: the 888 number answered by an AI attendant, chat bots, support links that do not work, and emails that go unanswered for weeks. One 5-star reviewer says the same.",
        refs: [
          "Dominique D.|Oct 23, 2026", "LJ|Oct 22, 2026", "Ken K.|Oct 22, 2026", "Edward J.|Oct 23, 2026", "Jaiman|Oct 22, 2026",
          "Ileana V.|Oct 21, 2026", "Mark M.|Oct 20, 2026", "Lilia K.|Oct 19, 2026", "Karen A.|Sep 21, 2026", "Mrs V|Sep 20, 2026",
          "Rosana O.|Oct 22, 2026",
        ],
        quote: "Mark M.|Oct 20, 2026",
      },
      {
        label: "The price after the first charge",
        detail: "A next bill double the quoted figure ($399 for a month of tirzepatide), a goal timeline that lengthened after payment, and two reviewers who like the service but find it expensive.",
        refs: ["Casey B.|Oct 23, 2026", "Mark M.|Oct 20, 2026", "Mrs V|Sep 20, 2026", "Tiffany C.|Sep 22, 2026"],
        quote: "Mrs V|Sep 20, 2026",
      },
      {
        label: "Late boxes and warm cold packs",
        detail: "A tracking date that moved twice, a 48-hour promise that took five days, and packages left on the ground.",
        refs: ["Holly H.|Sep 23, 2026", "Michael H.|Sep 21, 2026", "Angelia F.|Oct 21, 2026"],
        quote: "Holly H.|Sep 23, 2026",
      },
    ],
    note:
      "Two further October reviews are worth knowing about: one 4-star reviewer wanted an auto-injector rather than a syringe, and one 1-star reviewer says she was invited to review without ever being a customer. TrimRx's profile score fell from 3.8 to 3.4 between Oct 12 and Oct 25, 2026, with the review count also falling, which means Trustpilot removed reviews in that period.",
  },

  found: {
    praise: [
      {
        label: "Doctors, nurses and coaches who listen",
        detail:
          "Named clinicians who give feedback, answer questions with research attached, prescribe something for nausea when needed, and a nurse check-in reviewers look forward to.",
        refs: [
          "Jesse H.|Oct 22, 2026", "Jackie|Oct 22, 2026", "Claire G.|Oct 21, 2026", "Raul F.|Oct 16, 2026", "Maria G.|Oct 16, 2026",
          "Jayanna|Oct 16, 2026", "Kim H.|Oct 15, 2026", "Marti|Sep 30, 2026", "Blake L.|Sep 30, 2026", "Lynn C.|Sep 27, 2026",
          "Tiasha|Sep 26, 2026", "Jessica C.|Sep 14, 2026", "B. B.|Sep 14, 2026", "Kathy G.|Sep 13, 2026", "Heidi C.|Sep 8, 2026",
          "Eva M.|Sep 8, 2026", "Debra L.|Sep 7, 2026", "Montoya J.|Sep 7, 2026", "Brandy E.|Sep 5, 2026", "Frank G.|Oct 15, 2026",
          "Todd R.|Oct 12, 2026", "Janet J.|Sep 14, 2026",
        ],
        quote: "Tiasha|Sep 26, 2026",
      },
      {
        label: "Results over the long haul",
        detail: "90 pounds over two years, 50-plus pounds, 36 pounds over three years, food noise gone after decades, and reviewers who describe a changed relationship with eating.",
        refs: [
          "Jesse H.|Oct 22, 2026", "Christina P.|Oct 21, 2026", "Tamra H.|Oct 14, 2026", "Denise D.|Oct 15, 2026", "Ana C.|Sep 16, 2026",
          "Eva M.|Sep 8, 2026", "Jason C.|Sep 17, 2026", "Melanie F.|Sep 6, 2026", "Debi|Oct 16, 2026",
        ],
        quote: "Christina P.|Oct 21, 2026",
      },
      {
        label: "The app, the community and the coaching",
        detail: "Weight tracking with percentage lost, a weekly weigh-in rhythm, meal guidance, a member community and help with an insurance authorization.",
        refs: [
          "Christina P.|Oct 21, 2026", "Claire G.|Oct 21, 2026", "Jackie|Oct 22, 2026", "Tiasha|Sep 26, 2026", "Eva M.|Sep 8, 2026",
          "Melanie F.|Sep 6, 2026", "MK|Oct 13, 2026", "Evelyn|Oct 3, 2026", "Vicki M.|Sep 25, 2026", "Montoya J.|Sep 7, 2026",
          "Kim H.|Oct 15, 2026",
        ],
        quote: "Claire G.|Oct 21, 2026",
      },
    ],
    criticism: [
      {
        label: "Refill windows, refunds and pricing",
        detail:
          "A 3-month plan whose third refill was forfeited by missing the request window, a $3,000 charge before any consultation with the refund still pending, and a Medicare price that was not honored.",
        refs: ["Natalie P.|Oct 20, 2026", "Marie B.|Oct 20, 2026", "customer|Sep 14, 2026"],
        quote: "Natalie P.|Oct 20, 2026",
      },
      {
        label: "Reaching support",
        detail: "A phone line that goes to an AI bot with no human phone support, and an account frozen in a way that blocked customer service.",
        refs: ["Marie B.|Oct 20, 2026", "Linda P.|Sep 22, 2026"],
        quote: "Linda P.|Sep 22, 2026",
      },
      {
        label: "A shipment that did not arrive",
        detail: "One 4-star reviewer's medication did not show up; it was resent right away.",
        refs: ["Kristi|Oct 15, 2026"],
        quote: "Kristi|Oct 15, 2026",
      },
    ],
  },

  sprout: {
    praise: [
      {
        label: "Live customer service that replies right away",
        detail: "Nearly every Sprout review is about support: a live rep rather than a bot, immediate replies, and one agent (Frank) named by several reviewers.",
        refs: [
          "Ken|Sep 21, 2026", "Victoria L.|Sep 21, 2026", "Lisa M.|Sep 21, 2026", "Isabel M.|Sep 19, 2026", "Trish|Sep 19, 2026",
          "Kimberly|Sep 18, 2026", "Terrie G.|Sep 17, 2026", "Cindy|Sep 17, 2026", "The Hogans|Sep 17, 2026", "D M.|Sep 11, 2026",
          "Janet E.|Sep 10, 2026", "Holly C.|undated", "Kayte V.|undated", "Rajat R.|undated", "Jennifer V.|undated",
          "Mark|Jun 26, 2026",
        ],
        quote: "Lisa M.|Sep 21, 2026",
      },
      {
        label: "Results and a price they will adjust",
        detail: "20 pounds lost, most of a goal reached, and a plan re-priced on request when the customer found cheaper options.",
        refs: ["Victoria L.|Sep 21, 2026", "Isabel M.|Sep 19, 2026", "Salvatore C.|Aug 5, 2026", "Kayte V.|undated", "Mark|Jun 26, 2026", "Janet E.|Sep 10, 2026"],
        quote: "Isabel M.|Sep 19, 2026",
      },
      {
        label: "Pausing or changing a plan is easy",
        detail: "Reviewers who paused for travel or adjusted a plan say it was handled quickly.",
        refs: ["Trish|Sep 19, 2026", "Terrie G.|Sep 17, 2026", "Cindy|Sep 17, 2026", "Victoria L.|Sep 21, 2026"],
        quote: "Trish|Sep 19, 2026",
      },
    ],
    criticism: [
      {
        label: "Tracking, check-ins and instructions",
        detail: "Tracking sent on two of eight shipments, a monthly check-in that silently blocks shipping while still charging, orders occasionally late, and no injection instructions for one reviewer.",
        refs: ["James M.|Aug 6, 2026", "Mark|Jun 26, 2026", "Janet E.|Sep 10, 2026", "Salvatore C.|Aug 5, 2026"],
        quote: "Mark|Jun 26, 2026",
      },
      {
        label: "A side effect",
        detail: "One reviewer reports significant hair loss within a month of starting Sprout's compounded tirzepatide after none with other providers.",
        refs: ["Audrey S.|Sep 8, 2026"],
        quote: "Audrey S.|Sep 8, 2026",
      },
    ],
  },

  altrx: {
    praise: [
      {
        label: "Reviewers who expected the worst and were proven wrong",
        detail:
          "An unusual pattern: six of the sixteen reviewers say they signed up despite negative reviews they had read and found the opposite. Trustpilot has removed altRx's public rating, which is why no aggregate appears on this page.",
        refs: ["melissa A.|Sep 3, 2026", "Angela|Sep 2, 2026", "Tammy D.|Sep 1, 2026", "Shannon R.|Sep 1, 2026", "Tori W.|Aug 26, 2026", "Marlie C.|May 12, 2026"],
        quote: "Angela|Sep 2, 2026",
      },
      {
        label: "A price that did not rise with the dose",
        detail: "Reviewers report paying the same $148 or $149 as their dose went up, a third of what they paid elsewhere, and no surprise charges.",
        refs: ["melissa A.|Sep 3, 2026", "ZC|Jun 16, 2026", "Tori W.|Aug 26, 2026", "Kimberly W.|undated", "Marni G.|Aug 13, 2026", "Tammy D.|Sep 1, 2026"],
        quote: "ZC|Jun 16, 2026",
      },
      {
        label: "Prompt replies by message",
        detail: "Replies within 24 hours, a care consultant (Paige) who texts back, and a rep who walked a new customer through the plan.",
        refs: ["Cindi P.|Sep 7, 2026", "melissa A.|Sep 3, 2026", "Tammy D.|Sep 1, 2026", "Alicia V.|Aug 31, 2026", "Tori W.|Aug 26, 2026", "Lenden|undated", "B L.|Aug 26, 2026", "Marlie C.|May 12, 2026"],
        quote: "Cindi P.|Sep 7, 2026",
      },
      {
        label: "Delivery on time and results",
        detail: "Overnight FedEx after a Saturday doctor call, cold packaging, and 4 to 5 pounds a month or 8 to 10 pounds in the first weeks.",
        refs: ["Shannon R.|Sep 1, 2026", "Alicia V.|Aug 31, 2026", "Tori W.|Aug 26, 2026", "Carlton L.|Aug 14, 2026", "Kimberly W.|undated", "Marni G.|Aug 13, 2026", "Paula L.|Jun 10, 2026", "Marlie C.|May 12, 2026", "melissa A.|Sep 3, 2026"],
        quote: "Carlton L.|Aug 14, 2026",
      },
    ],
    criticism: [
      {
        label: "A refill that stalled",
        detail: "A third-month refill unfulfilled with no reason given, shipping that can take a little longer, and one case where support never replied though the consultant did.",
        refs: ["jb|undated", "B L.|Aug 26, 2026", "Marlie C.|May 12, 2026"],
        quote: "jb|undated",
      },
      {
        label: "Billing hiccups, resolved",
        detail: "One accidental charge refunded immediately, and an ad showing $129 corrected to $149 at sign-up.",
        refs: ["Alicia V.|Aug 31, 2026", "ZC|Jun 16, 2026"],
        quote: "Alicia V.|Aug 31, 2026",
      },
      {
        label: "A smaller vial than elsewhere",
        detail: "One reviewer on a high dose noticed the vial was smaller than from previous providers.",
        refs: ["Paula L.|Jun 10, 2026"],
        quote: "Paula L.|Jun 10, 2026",
      },
    ],
  },

  directmeds: {
    praise: [
      {
        label: "Phone reps who are patient and named",
        detail: "Most DirectMeds reviews thank a specific rep (Chelsea King is named three times) for walking a new customer through the steps by phone.",
        refs: ["Sandra|Sep 23, 2026", "Lauren|Sep 23, 2026", "Monica N.|Sep 23, 2026", "Janet G.|Sep 23, 2026", "Mary Ann R.|Sep 22, 2026", "Toni R.|Sep 22, 2026", "John|undated", "Charisse|undated", "Customer|undated"],
        quote: "Sandra|Sep 23, 2026",
      },
      {
        label: "A simple sign-up and reasonable prices",
        detail: "A straightforward sign-up with frequent text and email updates, and prices one reviewer calls reasonable.",
        refs: ["Bryan D.|Sep 23, 2026", "Gina|Sep 23, 2026"],
        quote: "Bryan D.|Sep 23, 2026",
      },
    ],
    criticism: [
      {
        label: "Orders that stalled or came up short",
        detail: "An order stuck at 'label created' until three calls, then damaged in transit while the AI chat insisted it was delivered; a first NAD bottle that covered two weeks, not a month, with no syringes.",
        refs: ["Jackson J.|Sep 23, 2026", "Gina|Sep 23, 2026", "Julia|Sep 22, 2026"],
        quote: "Jackson J.|Sep 23, 2026",
      },
      {
        label: "The online account",
        detail: "One reviewer could not open the doctor's message in the portal and would rather deal with reps by phone.",
        refs: ["Toni R.|Sep 22, 2026"],
        quote: "Toni R.|Sep 22, 2026",
      },
    ],
  },

  shed: {
    praise: [
      {
        label: "Real people who follow up",
        detail: "A phone call from a person instead of a robocall, agents who resolved a duplicate account, moved a refill date so a shot day was not missed, and scheduled coaching.",
        refs: ["BAG|Sep 23, 2026", "BB|Sep 15, 2026", "R M|Sep 15, 2026", "Maria M.|Sep 11, 2026", "Victoria C.|Sep 2, 2026", "Michelle W.|Sep 2, 2026", "Cindy C.|undated", "Jordan R.|undated", "Joyce H.|undated"],
        quote: "Michelle W.|Sep 2, 2026",
      },
    ],
    criticism: [
      {
        label: "Charges after stopping, and AI-only chat",
        detail: "One reviewer says he was charged for months after stopping, was told not to expect a refund, and found only AI support; a 5-star reviewer also calls the app and chat clunky until a person took over by email.",
        refs: ["Justin J.|Sep 14, 2026", "R M|Sep 15, 2026"],
        quote: "Justin J.|Sep 14, 2026",
      },
    ],
  },
};
