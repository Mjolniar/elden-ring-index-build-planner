export function GuidePanel() {
  return (
    <div className="guide-panel">
      <h2>How to use Elden Ring Randomizer Index and Build Planner</h2>

      <section className="guide-section">
        <h3>Getting started</h3>
        <ol>
          <li>Generate a spoiler log with the Elden Ring Item & Enemy Randomizer (look in the randomizer's <code>spoiler_logs/</code> folder).</li>
          <li>Open this app and drop your <code>.txt</code> spoiler log into the upload area, or click to browse.</li>
          <li>The app reads every item placement, parses out the randomized locations, and makes everything searchable.</li>
          <li>Everything runs locally — no data is ever uploaded or sent anywhere.</li>
        </ol>
      </section>

      <section className="guide-section">
        <h3>Search tab</h3>
        <p>Find any item in your randomized seed.</p>
        <ul>
          <li>Type in the search box to filter by <strong>item name</strong>, <strong>location</strong>, or <strong>area</strong>. When spoiler mode is enabled in Settings, location search is removed to avoid revealing exact placements.</li>
          <li>Use the source dropdown to limit results to boss drops, shops, ground pickups, starting loadouts, quest rewards, or enemy drops.</li>
          <li>Check <strong>"Key items only"</strong> to see only essential progression items (medallions, great runes, keys).</li>
          <li>Click any row to expand it and see the spoiler-log section it came from and the raw line.</li>
          <li>Click column headers to sort by item name, location, area, or source type.</li>
          <li>Star items using the ★ column to save them to your Favorites. Mark items as acquired using the checkbox.</li>
          <li>Export visible results as CSV or JSON using the buttons in the toolbar.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Favorites tab</h3>
        <p>Track the items you care about and what you've already picked up.</p>
        <ul>
          <li>Any item you star in the Search, Browse, or Builds tabs appears here.</li>
          <li>The <strong>Acquired</strong> column lets you check off items as you collect them.</li>
          <li>A summary at the top shows how many favorites you've acquired so far.</li>
          <li>Acquired items show with reduced opacity and a strikethrough so you can see what's left at a glance.</li>
          <li>Favorites and acquired state persist in your browser even after closing the app.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Builds tab</h3>
        <p>Compare common Elden Ring builds against your randomized seed to plan a viable route.</p>
        <ul>
          <li>Select <strong>stat chips</strong> (Vigor, Strength, Faith, etc.) to filter builds that use those stats.</li>
          <li>Toggle <strong>"Match all selected stats"</strong> to require every selected stat, or leave it off to match any.</li>
          <li>Use the <strong>Search builds</strong> box to find builds by name, level, or stat profile.</li>
          <li>Pick a build from the sidebar — it shows a checklist of required items sorted by rough area progression (earliest obtainable first).</li>
          <li>Each row shows:
            <ul>
              <li><strong>Need</strong>: the item required by the build.</li>
              <li><strong>Type</strong>: whether it's a weapon, shield, seal, staff, armor, talisman, spell, ash, or free-form guidance.</li>
              <li><strong>Status</strong>: <span className="badge badge-ground_pickup">Found</span> if the item appears in your spoiler log, <span className="badge badge-warn">Missing</span> if it does not, or <span className="badge badge-flex">Flexible</span> for general advice like "any armor with high poise."</li>
              <li><strong>Randomized location</strong>: where to find the item in your seed.</li>
              <li><strong>Area</strong>: the broader region the location belongs to.</li>
            </ul>
          </li>
          <li>Flexible requirements (e.g. "Light Armor" or "Seal that weighs nothing") are free-form build notes, not specific spoiler-log items. They appear as <span className="badge badge-flex">Flexible</span> with guidance text.</li>
          <li>Counts at the top show <strong>required found</strong> (non-optional, non-freeform items matched in your seed) and <strong>flexible notes</strong> (free-form guidance items).</li>
          <li>Star and acquire items directly from the build table to add them to your Favorites.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Custom builds</h3>
        <p>Create your own build checklists tailored to your playstyle.</p>
        <ul>
          <li>Click <strong>"+ New build"</strong> at the bottom of the Builds sidebar.</li>
          <li>Give it a name, level, primary/secondary stats, and a short description.</li>
          <li>Add requirements one at a time: type an item name, pick the kind (weapon, talisman, spell, etc.), and mark as optional if needed.</li>
          <li>Click <strong>Save build</strong> — it will appear under "Your Builds" in the sidebar and is matched against the loaded spoiler log immediately.</li>
          <li>Custom builds persist in your browser for future sessions. Edit or delete them anytime using the buttons in the build detail panel.</li>
          <li>Uses the same matching engine as preset builds — items that are free-form notes are detected automatically.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Browse tab</h3>
        <p>Explore all items in your seed that fit a particular build style, sorted by how early you can get them.</p>
        <ul>
          <li>Select stats (e.g. Strength + Faith) to see every item from the loaded spoiler log that is used by builds matching those stats.</li>
          <li>Items are sorted by area progression by default — the sooner you can reach the area, the higher it appears.</li>
          <li>Filter by item type (weapon, talisman, spell, etc.) to narrow down results.</li>
          <li>The <strong>Builds</strong> column shows how many preset builds use each item — higher numbers mean more broadly useful items.</li>
          <li>Click column headers to re-sort by area, item name, or number of builds using the item.</li>
          <li>Star and acquire items to build your own pickup plan from scratch.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Diagnostics tab</h3>
        <p>Technical details about the parsed spoiler log.</p>
        <ul>
          <li>Shows the loaded filename, seed number, total lines parsed, and sections found.</li>
          <li>Displays parser warnings if any lines could not be understood.</li>
          <li>Expand unmatched lines to see raw text that the parser skipped (useful for reporting format issues).</li>
          <li>Shows the cached copy location (in Electron, this is saved next to the app for auto-restore).</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Tips</h3>
        <ul>
          <li>The app caches your last loaded spoiler log for the next launch — no need to reload it every time.</li>
          <li>Items marked as acquired are persisted across launches. Use the Favorites tab to track your pickup progress session to session.</li>
          <li>Build presets are curated from public build guides (Fextralife, YouTube, community guides). They are item checklists, not stat calculators or full route plans.</li>
          <li>If an item shows as <span className="badge badge-warn">Missing</span> but you know it's in your seed, check the Diagnostics tab — the parser may have skipped it due to unusual formatting.</li>
          <li>No network access is needed — the app works fully offline.</li>
        </ul>
      </section>
      <section className="guide-section">
        <h3>Settings tab</h3>
        <p>Control what spoiler information is visible.</p>
        <ul>
          <li><strong>Spoiler mode off</strong> (default): exact locations, areas, and source types are shown for every randomized item.</li>
          <li><strong>Spoiler mode on</strong>: exact locations are hidden. You choose what partial information to show instead — area, source type, or a generated hint combining the two.</li>
          <li><strong>Show area</strong> reveals the broad region the item is in (e.g. Limgrave, Leyndell) without the specific location name.</li>
          <li><strong>Show source type</strong> reveals how the item is obtained: boss drop, shop purchase, enemy drop, etc.</li>
          <li><strong>Show hint</strong> generates a short clue combining the source type and area, e.g. "Boss drop in Limgrave."</li>
          <li>Settings persist across launches in your browser.</li>
        </ul>
      </section>
    </div>
  );
}
