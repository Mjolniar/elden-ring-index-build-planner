export function GuidePanel() {
  return (
    <div className="guide-panel">
      <h2>How to use Elden Ring Index and Build Planner</h2>

      <section className="guide-section">
        <h3>Getting started</h3>
        <ol>
          <li>Open the app — all 1,200+ items from the Elden Ring base game and Shadow of the Erdtree DLC are loaded automatically.</li>
          <li>Every item shows its fixed vanilla location, harvested from the Fextralife wiki.</li>
          <li>Use the tabs at the top to search, manage favorites, plan builds, or browse items by stat type.</li>
          <li>Everything runs locally — no data is ever uploaded or sent anywhere.</li>
        </ol>
      </section>

      <section className="guide-section">
        <h3>Search tab</h3>
        <p>Find any item in the Elden Ring item database.</p>
        <ul>
          <li>Type in the search box to filter by <strong>item name</strong>, <strong>location</strong>, or <strong>area</strong>.</li>
          <li>Use the source dropdown to limit results to boss drops, shops, ground pickups, quest rewards, or enemy drops.</li>
          <li>Check <strong>"Key items only"</strong> to see only essential progression items (medallions, great runes, keys).</li>
          <li>Click any row to expand it and see the full item details including source type and area.</li>
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
        <p>Browse curated Elden Ring builds and see every required item with its vanilla location.</p>
        <ul>
          <li>Select <strong>stat chips</strong> (Vigor, Strength, Faith, etc.) to filter builds that use those stats.</li>
          <li>Toggle <strong>"Match all selected stats"</strong> to require every selected stat, or leave it off to match any.</li>
          <li>Use the <strong>Search builds</strong> box to find builds by name, level, or stat profile.</li>
          <li>Pick a build from the sidebar — it shows a checklist of required items sorted by rough area progression (earliest obtainable first).</li>
          <li>Each row shows:
            <ul>
              <li><strong>Need</strong>: the item required by the build.</li>
              <li><strong>Type</strong>: whether it's a weapon, shield, seal, staff, armor, talisman, spell, ash, or free-form guidance.</li>
              <li><strong>Location</strong>: the vanilla location where this item is found.</li>
              <li><strong>Area</strong>: the broader region the location belongs to.</li>
            </ul>
          </li>
          <li>Flexible requirements (e.g. "Light Armor" or "Seal that weighs nothing") are free-form build notes. They appear as <span className="badge badge-flex">Flexible</span> with guidance text.</li>
          <li>Counts at the top show <strong>required items</strong> (non-optional, non-freeform items) and <strong>flexible notes</strong> (free-form guidance items).</li>
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
          <li>Click <strong>Save build</strong> — it will appear under "Your Builds" in the sidebar.</li>
          <li>Custom builds persist in your browser for future sessions. Edit or delete them anytime using the buttons in the build detail panel.</li>
          <li>Uses the same matching engine as preset builds — items that are free-form notes are detected automatically.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Browse tab</h3>
        <p>Explore all items that fit a particular build style, sorted by how early you can reach them.</p>
        <ul>
          <li>Select stats (e.g. Strength + Faith) to see every item from the database that is used by builds matching those stats.</li>
          <li>Items are sorted by area progression by default — the sooner you can reach the area, the higher it appears.</li>
          <li>Filter by item type (weapon, talisman, spell, etc.) to narrow down results.</li>
          <li>The <strong>Builds</strong> column shows how many preset builds use each item — higher numbers mean more broadly useful items.</li>
          <li>Click column headers to re-sort by area, item name, or number of builds using the item.</li>
          <li>Star and acquire items to build your own pickup plan from scratch.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Tips</h3>
        <ul>
          <li>Items marked as acquired are persisted across launches. Use the Favorites tab to track your pickup progress session to session.</li>
          <li>Build presets are curated from public build guides (Fextralife, YouTube, community guides). They are item checklists, not stat calculators or full route plans.</li>
          <li>Item locations are harvested from the Elden Ring Fextralife wiki and supplemented with manual corrections. Some niche items may have incomplete location data.</li>
          <li>No network access is needed — the app works fully offline. Wiki links open in your default browser if you choose to visit them.</li>
        </ul>
      </section>
    </div>
  );
}
