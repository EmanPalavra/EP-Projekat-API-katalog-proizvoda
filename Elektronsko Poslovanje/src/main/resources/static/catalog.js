(() => {
  const endpoint = "/graphql";
  const PAGE_SIZE = 12;
  const icons = { Audio: "♫", Računari: "⌘", Telefonija: "▯", "Kućna elektronika": "⌂", Gaming: "✦" };
  const productPhotos = {
    headphones: ["photo-1641563786213-185d68345426", "photo-1578517581165-61ec5ab27a19", "photo-1505740420928-5e560c06d30e", "photo-1585298723682-7115561c51b7", "photo-1584585696759-1df9872e1eca", "photo-1600019154861-7d9aa8432718"],
    earbuds: ["photo-1783890848515-c0dc28b25ef2", "photo-1770292170233-5d9e235ec739", "photo-1755182529034-189a6051faae", "photo-1778854227926-2ebdb2eeadb0", "photo-1606741965429-8d76ff50bb2f", "photo-1600030055408-3e60c6b9e921", "photo-1606741965359-946075e4d550"],
    speakers: ["photo-1675523796635-d6e4d8a127b1", "photo-1633806442577-201eb855c2d3", "photo-1725016934951-5acd118169de", "photo-1589833300946-cefa50d0966c", "photo-1649847981376-330b294b31ef"],
    microphones: ["photo-1776690329305-fb4141bd528a", "photo-1634041324442-d3dfca8292be", "photo-1774371337512-f3aba9f57f22", "https://cdn11.bigcommerce.com/s-qzsvj0y9o3/images/stencil/1280x1280/products/46682/232396/YOTHER12422502__29934.1678706966.jpg?c=1", "https://scale.coolshop-cdn.com/product-media.coolshop-cdn.com/AK7E4Q/b95e732003244042937f3357bbbd0945.jpg/f/blue-microphone-yeti-silver.jpg"],
    laptops: ["photo-1705508216613-be1715a31212", "photo-1772971837855-4f64761b3de1", "photo-1495465798138-718f86d1a4bc", "photo-1578950435899-d1c1bf932ab2", "photo-1645940307919-f931129e0fa7"],
    monitors: [
      "https://cdn.sanity.io/images/hf5b3axp/production/ff6335016128e2e9b73f201e30167fee0a93dd28-3840x3840.png?auto=format&fit=max&w=900",
      "https://cdn.sanity.io/images/hf5b3axp/production/1281d6b4a42c6b278fbf8898d408f9d8ecfd8484-5280x4920.png?auto=format&fit=max&w=900",
      "https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Monitor/Images/242196_0_f6gsq4.png",
      "https://elitehubs.com/cdn/shop/products/33697_S-500-2.jpg?v=1683972555",
      "photo-1527443224154-c4a3942d3acf"
    ],
    keyboards: [
      "photo-1538481199705-c710c4e965fc", "photo-1674621703172-ef68b33e52da",
      "https://assets2.razerzone.com/images/pnx.assets/aaf5d0d09601e879bf4a1c08df0f0376/razer-huntsman-gallery01.jpg",
      "https://elitehubs.com/cdn/shop/products/rz03-03930300-r3m1-image-main-600x600-1.webp?v=1683975794",
      "photo-1595225476474-87563907a212", "photo-1587829741301-dc798b83add3",
      "https://kairaglobal.com.my/cdn/shop/products/1_1e081dbb-c76b-4f48-87c4-ba9d4a4ec62b_900x.jpg?v=1629439052"
    ],
    gamingMice: [
      "photo-1627850743564-20d3c0125ea8", "photo-1563297007-0686b7003af7",
      "https://assets2.razerzone.com/images/da10m/carousel/razer-death-adder-gallery-12.png",
      "https://product.hstatic.net/200000420363/product/chuot-gaming-razer-deathadder-essential-ergonomic-3_c4574016e8e94ba1aea1ec7e2a9dd70f_1024x1024.jpg",
      "https://www.logitechstore.com.co/cdn/shop/collections/CATEGORIA-BannerSlider_G_Mouse.jpg?v=1753156979",
      "photo-1628202926206-c63a34b1618f"
    ],
    webcams: ["photo-1626581795188-8efb9a00eeec", "photo-1626581806599-d12b0bbd4225", "https://cdn.mos.cms.futurecdn.net/6PmerM5gpAkZWeaBNgLPcH.jpg", "https://static.wixstatic.com/media/9fa47c_93987d035c4e42779829809d72eff5ca~mv2.png/v1/fill/w_568%2Ch_488%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/9fa47c_93987d035c4e42779829809d72eff5ca~mv2.png", "https://media.cdn.kaufland.de/product-images/1024x1024/df8cdb8be728acdb8d3335479cf0e5f4.jpg"],
    storage: ["https://i5.walmartimages.com/asr/8cdaf0d5-2096-4a71-b77b-6fa2749e8516.8e3b0eea56ebe4f365b03583f4bee988.jpeg?odnBg=FFFFFF&odnHeight=612&odnWidth=612", "https://www.tpstech.in/cdn/shop/products/samsung-t7-external-ssd-gray-from-tpstech.in-main1.jpg?v=1672119456&width=900", "https://www.tpstech.in/cdn/shop/products/samsung-t7-external-ssd-blue-from-tpstech.in-main2_a4da5c85-50cc-4a39-a38b-5bcc11f0edad.jpg?v=1672049817&width=900"],
    docks: ["https://i5.walmartimages.com/asr/76a3333c-cfa6-4789-ad31-6c99af877b9a.4d3a441fb1415ccd29f4597456a37d40.jpeg", "https://ae-pic-a1.aliexpress-media.com/kf/S5070c0855644435693c70cc8cd627fdfh.jpg", "https://static.k24.cz/product-picture/6/SPORTEX590769558003488110REI1-1.jpg"],
    mousepads: ["photo-1763258986479-0962883e1747", "photo-1766052631066-8cdc780a4b5f", "photo-1627850743564-20d3c0125ea8"],
    computerDesks: ["photo-1764588029885-d115de3bda1e", "photo-1702390753019-e43a19d9371f", "photo-1766052631066-8cdc780a4b5f"],
    phones: ["photo-1505468726633-0069fc52f4b9", "photo-1587999727764-df5d99307f9c", "photo-1778854227926-2ebdb2eeadb0", "photo-1498661705887-3778d9ecb4ff", "photo-1738830256741-5bc3d0d1571c", "photo-1724323161012-aa880f17fb63", "photo-1650170758285-6ff1ccdf980b", "photo-1637806544403-944ada390bee", "photo-1636979863903-755360b5518b", "photo-1702451462735-3f0ba7679641", "photo-1645940307919-f931129e0fa7"],
    chargers: ["https://fixed.zone/cdn/shop/files/FIXC30N-C-WH_LS1.jpg?v=1756040457&width=900", "https://tugate.ch/imagens/artigos/2024/07/02/tugatech-0179-21129.jpg", "https://storage.googleapis.com/bpv/charger-usb-cable-type-c-white-isolated-background.exact1600w.jpg", "https://handy24.de/cdn/shop/articles/ladekabel_e18dcfd0-1b60-433c-81e6-74755fd05b12.png?v=1770072025&width=900"],
    powerBanks: ["https://media.naheed.pk/catalog/product/cache/ff36c7bc52e2e5dbc63cd67fba513679/1/1/1151254-1.jpg", "https://www.technolife.com/image/color_image_TLP-432717_ede058a7-0696-4591-a9c8-16a23ac11969.png", "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big%2C%2C2019/7/pr_2019_7_9_14_29_13_980_01.jpg", "https://nelooq.com/liveimages/nelooq_cms_products/2204645731.jpg"],
    cases: ["photo-1650170758285-6ff1ccdf980b", "photo-1645940307919-f931129e0fa7", "photo-1636979863903-755360b5518b"],
    cables: ["https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dwe387186a/images/hi-res/a/10b0177c689709d8_CAB004bt2MBK_BoostCharge_Braided_USB-C_to_USB-C_EVN1.jpg?sfrm=png", "https://static.wixstatic.com/media/9c5698_27a1c59b44594b6ebc4aa0c6b323a564~mv2.jpg/v1/fill/w_900%2Ch_900%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/9c5698_27a1c59b44594b6ebc4aa0c6b323a564~mv2.jpg", "https://cdn.allmarket.ge/2504/01/02/70/77/b866e252ec32427e8b79d583a1f2d58c/usb-kabeli-ugreen-us261-50153-60w-type-c-to-type-c-pd-fast-charging-cable-3a-max-1m-grey.jpg"],
    wirelessChargers: ["https://jusinhellife.com/cdn/shop/collections/pexels-cottonbro-studio-5083491.jpg?v=1694157544"],
    tablets: ["photo-1568842293346-22b714e801f6", "photo-1589739900243-4b52cd9b104e", "photo-1691599703441-58bee2410f42", "photo-1548524238-84b050571016"],
    robotVacuum: ["photo-1757478558214-5671402e85d9", "photo-1558317374-24793bc9f2fb", "photo-1603618090561-412154b4bd1b"],
    airPurifiers: ["https://bytovaya-tehnika.msk.ru/images/items/2258/684818a15dc00_full.jpg", "https://www.toppc.lt/images/pic/2400/2400/004/1368.jpg", "https://product.hstatic.net/200000805527/product/19_b6beeb7125a947b5b2f4ceda3d47b312_master.png"],
    controllers: ["photo-1638537926441-7dc6c43cdbf8", "photo-1782290547044-acb38dfe735a", "photo-1605640194512-2f7440046c2a", "photo-1606144042614-b2417e99c4e3", "photo-1592840496694-26d035b52b48"],
    consoles: ["https://store.sony.co.nz/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png", "https://www.addon.mv/cdn/shop/products/01-min_3bf591e3-9222-4759-b123-8ab81c235f6e.png?v=1670242191", "https://images.tcdn.com.br/img/img_prod/798481/console_sony_playstation_5_standard_409_4_17f1c9f366830ea0e9ca3ea1d08da9ca.jpg", "https://gameonoff.com/wp-content/uploads/2024/06/sony-playstastion-5-2020-1200x1200-1.png", "https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/711719541769_4.jpg"],
    gamingChairs: ["https://paracon.dk/images/PC164-8-p.jpg", "https://xrocker.co.uk/cdn/shop/files/onyx-office-gaming-chair-red-1_1000x1000_crop_center.jpg?v=1690450567", "https://i.ebayimg.com/images/g/B3EAAeSwh2pogzKO/s-l400.png"],
    gamingMonitors: [
      "https://cdn.sanity.io/images/hf5b3axp/production/ff6335016128e2e9b73f201e30167fee0a93dd28-3840x3840.png?auto=format&fit=max&w=900",
      "https://cdn.sanity.io/images/hf5b3axp/production/1281d6b4a42c6b278fbf8898d408f9d8ecfd8484-5280x4920.png?auto=format&fit=max&w=900",
      "https://dmau.imgix.net/media/catalog/product/l/s/ls27dg302eexxy-samsung-odyssey-g30d-fhd-gaming-monitor_yrsewdqkamhvpfar.jpg",
      "https://elitehubs.com/cdn/shop/products/33697_S-500-2.jpg?v=1683972555",
      "https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Monitor/Images/242196_0_f6gsq4.png"
    ],
    gamingSetups: ["photo-1763258986479-0962883e1747", "photo-1766052631066-8cdc780a4b5f"],
    gamingHeadsets: ["photo-1679429973860-d430a100db8c", "photo-1766052631066-8cdc780a4b5f", "https://cdn.mwave.com.au/images/400/_razer_blackshark_v2_x_usb_wired_gaming_headset_ac57567.jpg", "https://cdn11.bigcommerce.com/s-q8jsr/images/stencil/original/products/3401/21687/Razer_BlackShark_V2_X_USB_Wired_eSports_Headset_with_Noise-Cancelling_Mic-1__48812.1674805590.jpg", "https://cdn.mos.cms.futurecdn.net/hZBoK5nrpFj2tGhvXGQRC9.jpg"],
    turntables: ["photo-1461360228754-6e81c478b882", "photo-1603048588665-791ca8aea617", "photo-1606422654574-155f20b8b1a2"],
    coffeeMachine: ["photo-1736276924647-886ef1a7cac3", "https://www.dokani.tn/web/image/product.template/3133/image_1024?unique=95c291e", "https://http2.mlstatic.com/D_NQ_NP_677603-MLA106410574743_022026-O.webp", "https://hauscenter.com.bo/_next/image?q=75&url=https%3A%2F%2Fwww.dashboard.hauscenter.com.bo%2Fuploads%2F1_PECAMG_000000003_05f73f8670.jpg&w=900", "https://ptwebimg-3.pinshop.com/i/2025/10/25/h0e66f-2.jpg"],
    smartwatch: ["photo-1777496410128-926b2d0083f9", "photo-1644776274208-7bbad46246f8", "photo-1647869529918-999e290b533e", "photo-1645963846872-7514cf64cd3c"],
    blender: ["photo-1654064754916-e3edeb09c042", "https://assets.decocache.com/frigidaire-es/7af465d7-1be4-40b2-b3f8-e5dad887b6d0/Blender_FBS30_Kitchen_B_Frigidaire_1000x1000-1000x1000.raw.png", "https://westbend.com/cdn/shop/files/b7hv109klnccyi90q40o.jpg?v=1770752886", "https://cdn11.bigcommerce.com/s-28n2ql08/images/stencil/1080x1080/products/642/8481/Magimix_Power_Blender_in_Cream_2__53437.1614764288.jpg?c=2", "https://1531908337.rsc.cdn77.org/temp/1714508704_72657cdd4ccc682004b991958a5d15d3.jpg"],
    kettle: ["photo-1607791776974-5c30b43ac181", "https://ic4-a.wowma.net/mis/gr/135/image.wowma.jp/2539644/HK05/7272453-y.jpg", "https://www.tahtakaletoptanticaret.com/image/catalog/product/24242448164/27947662.jpg", "https://www.bigw.com.au/medias/sys_master/images/images/h16/h99/26935840768030.jpg", "https://storage.yandexcloud.net/mostro-gm-media/9306cd31-2544-74f3-14b3-d8df6f1c86e1/8.jpg"],
    smartBulbs: ["https://assets.mitre10.co.nz/sys-master/productimages/h09/h7e/10780174024734/394833xlg_1.jpg", "https://tccommercear.vtexassets.com/arquivos/ids/157636/Sin-titulo-1.png?v=638284806980670000", "https://www.gelighting.com/sites/default/files/styles/small_hq/public/image/2022-03/color-a19.jpg?itok=19haxWi-", "https://www.lyco.co.uk/media/catalog/product/E/3/E32508_02.jpg?bg-color=255%2C255%2C255&canvas=800%3A800&fit=bounds&height=800&quality=100&width=800", "https://www.istorm.gr/cdn/shop/files/929002468801_01.jpg?v=1720449920"],
    smartHome: ["photo-1707733148825-e49aa84d7f43"]
  };
  const els = {
    grid: document.querySelector("#products-grid"), count: document.querySelector("#catalog-count"),
    categoryList: document.querySelector("#category-list"), categoryFilters: document.querySelector("#category-filters"),
    search: document.querySelector("#search-input"), min: document.querySelector("#min-price"), max: document.querySelector("#max-price"),
    available: document.querySelector("#available-only"), sort: document.querySelector("#sort-select"), pagination: document.querySelector("#pagination"),
    activeFilters: document.querySelector("#active-filters"), empty: document.querySelector("#empty-state"), error: document.querySelector("#error-state")
  };
  const state = { categories: [], categoryId: null, page: 0, totalPages: 0, totalElements: 0, timer: null };

  async function graphQl(query, variables = {}) {
    const response = await fetch(endpoint, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables })
    });
    if (!response.ok) throw new Error(`Server je odgovorio statusom ${response.status}.`);
    const payload = await response.json();
    if (payload.errors?.length) throw new Error(payload.errors[0].message);
    return payload.data;
  }

  async function loadCategories() {
    const data = await graphQl(`query { categories { id name description } }`);
    state.categories = data.categories;
    renderCategoryShortcuts();
    renderCategoryFilters();
  }

  function renderCategoryShortcuts() {
    const all = `<button class="category-chip ${state.categoryId === null ? "active" : ""}" type="button" data-category="all"><span class="cat-icon">▦</span><span>Sve</span></button>`;
    els.categoryList.innerHTML = all + state.categories.map(category => `
      <button class="category-chip ${String(state.categoryId) === String(category.id) ? "active" : ""}" type="button" data-category="${escapeHtml(category.id)}">
        <span class="cat-icon">${icons[category.name] || "◈"}</span><span>${escapeHtml(category.name)}</span>
      </button>`).join("");
    els.categoryList.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => setCategory(button.dataset.category)));
  }

  function renderCategoryFilters() {
    els.categoryFilters.innerHTML = `<label class="category-option"><input type="radio" name="category" value="all" ${state.categoryId === null ? "checked" : ""}><span>Sve kategorije</span></label>` + state.categories.map(category => `
      <label class="category-option"><input type="radio" name="category" value="${escapeHtml(category.id)}" ${String(state.categoryId) === String(category.id) ? "checked" : ""}>
      <span>${escapeHtml(category.name)}</span></label>`).join("");
    els.categoryFilters.querySelectorAll("input").forEach(input => input.addEventListener("change", () => setCategory(input.value)));
  }

  function setCategory(value) {
    state.categoryId = value === "all" ? null : value;
    state.page = 0;
    renderCategoryShortcuts();
    renderCategoryFilters();
    loadProducts();
  }

  function currentSort() {
    const [sortBy, direction] = els.sort.value.split("_");
    return { sortBy, direction };
  }

  async function loadProducts() {
    els.error.hidden = true;
    els.empty.hidden = true;
    els.pagination.innerHTML = "";
    els.grid.innerHTML = `<div class="loading-state">Pripremamo katalog…</div>`;
    try {
      const filter = {};
      const search = els.search.value.trim();
      const minPrice = els.min.value;
      const maxPrice = els.max.value;
      if (search) filter.search = search;
      if (state.categoryId !== null) filter.categoryId = state.categoryId;
      if (minPrice !== "") filter.minPrice = Number(minPrice);
      if (maxPrice !== "") filter.maxPrice = Number(maxPrice);
      if (els.available.checked) filter.availableOnly = true;
      const { sortBy, direction } = currentSort();
      const data = await graphQl(`query Products($filter: ProductFilterInput, $page: Int, $size: Int, $sortBy: ProductSort, $direction: SortDirection) {
        products(filter: $filter, page: $page, size: $size, sortBy: $sortBy, direction: $direction) {
          items { id sku name description price stock active category { id name } }
          page size totalElements totalPages hasNext
        }
      }`, { filter, page: state.page, size: PAGE_SIZE, sortBy, direction });
      const page = data.products;
      state.totalElements = page.totalElements;
      state.totalPages = page.totalPages;
      els.count.innerHTML = `<strong>${page.totalElements}</strong> ${page.totalElements === 1 ? "proizvod" : "proizvoda"}`;
      document.querySelector("#hero-product-count").textContent = `${page.totalElements} proizvoda u ponudi`;
      renderCategoryFilters();
      renderProducts(page.items);
      renderPagination(page);
      renderActiveFilters();
    } catch (error) {
      els.grid.innerHTML = "";
      els.count.textContent = "";
      els.error.hidden = false;
      document.querySelector("#error-message").textContent = `${error.message} Provjeri da li je aplikacija pokrenuta.`;
    }
  }

  function renderProducts(products) {
    if (!products.length) {
      els.grid.innerHTML = "";
      els.empty.hidden = false;
      return;
    }
    els.grid.innerHTML = products.map((product, index) => {
      const available = product.stock > 0;
      const icon = icons[product.category.name] || "◈";
      const photo = photoForProduct(product);
      const stockText = !available ? "Trenutno nedostupno" : product.stock <= 4 ? `Još ${product.stock} na stanju` : "Dostupno";
      const stockClass = !available ? "" : product.stock <= 4 ? "low-stock" : "available";
      return `<article class="product-card" style="animation-delay:${Math.min(index * 35, 245)}ms">
        <div class="product-visual"><span class="product-badge ${available ? "in-stock" : "out-stock"}">${available ? "Dostupno" : "Rasprodano"}</span><span class="product-code">${escapeHtml(product.sku)}</span>${photo ? `<img class="product-photo ${photo.startsWith("https://") ? "product-photo-contained" : ""}" src="${photo}" alt="Ilustrativna fotografija za ${escapeHtml(product.name)}" loading="lazy" decoding="async">` : ""}<div class="product-art" aria-hidden="true">${icon}</div></div>
        <div class="product-info"><div class="product-category">${escapeHtml(product.category.name)}</div><h3 class="product-name">${escapeHtml(product.name)}</h3><p class="product-description">${escapeHtml(product.description || "Kvalitetan izbor za svakodnevnu upotrebu.")}</p><div class="product-bottom"><div class="product-price">${formatPrice(product.price)} <small>KM</small></div><span class="stock-note ${stockClass}">${stockText}</span></div></div>
      </article>`;
    }).join("");
    els.grid.querySelectorAll(".product-photo").forEach(image => {
      const showPhoto = () => image.closest(".product-visual").classList.add("has-photo");
      image.addEventListener("load", showPhoto, { once: true });
      image.addEventListener("error", () => image.remove(), { once: true });
      if (image.complete && image.naturalWidth > 0) showPhoto();
    });
  }

  function photoForProduct(product) {
    const name = product.name.toLocaleLowerCase("bs");
    let key;
    if (product.category.name === "Audio") {
      key = /zvučnik|soundbar/.test(name) ? "speakers"
        : /mikrofon/.test(name) ? "microphones"
        : /gramofon/.test(name) ? "turntables"
        : /earbuds|bubice/.test(name) ? "earbuds"
        : "headphones";
    } else if (product.category.name === "Računari") {
      key = /monitor/.test(name) ? "monitors"
        : /tastatura|keyboard/.test(name) ? "keyboards"
        : /miš|mis|mouse/.test(name) ? "gamingMice"
        : /kamera|webcam/.test(name) ? "webcams"
        : /laptop/.test(name) ? "laptops"
        : /ssd/.test(name) ? "storage"
        : /dock/.test(name) ? "docks"
        : /podloga/.test(name) ? "mousepads"
        : "computerDesks";
    } else if (product.category.name === "Telefonija") {
      key = /smartwatch|sat/.test(name) ? "smartwatch"
        : /tablet/.test(name) ? "tablets"
        : /punjač fastcharge/.test(name) ? "chargers"
        : /maskica/.test(name) ? "cases"
        : /power bank/.test(name) ? "powerBanks"
        : /kabl/.test(name) ? "cables"
        : /bežični punjač/.test(name) ? "wirelessChargers"
        : "phones";
    } else if (product.category.name === "Kućna elektronika") {
      key = /pročišćivač/.test(name) ? "airPurifiers"
        : /robot/.test(name) ? "robotVacuum"
        : /sijalica/.test(name) ? "smartBulbs"
        : /kafa/.test(name) ? "coffeeMachine"
        : /blender/.test(name) ? "blender"
        : /čajnik/.test(name) ? "kettle"
        : "smartHome";
    } else if (product.category.name === "Gaming") {
      key = /monitor/.test(name) ? "gamingMonitors"
        : /stolica/.test(name) ? "gamingChairs"
        : /tastatura/.test(name) ? "keyboards"
        : /kamera|webcam/.test(name) ? "webcams"
        : /konzola/.test(name) ? "consoles"
        : /kontroler|gamepad/.test(name) ? "controllers"
        : /miš|mis|mouse/.test(name) ? "gamingMice"
        : /slušalice/.test(name) ? "gamingHeadsets"
        : "gamingSetups";
    }
    if (!key) return "";
    const skuNumber = Number(product.sku?.match(/(\d+)$/)?.[1] || product.id || 0);
    const photoId = productPhotos[key][skuNumber % productPhotos[key].length];
    return photoId.startsWith("https://") ? photoId : `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=720&q=82`;
  }

  function renderPagination(page) {
    if (page.totalPages <= 1) return;
    const makeButton = (label, target, disabled = false, current = false, aria = label) => `<button type="button" class="page-button ${current ? "current" : ""}" data-page="${target}" ${disabled ? "disabled" : ""} aria-label="${aria}" ${current ? "aria-current=\"page\"" : ""}>${label}</button>`;
    let html = makeButton("‹", state.page - 1, state.page === 0, false, "Prethodna stranica");
    const visible = new Set([0, state.totalPages - 1, state.page - 1, state.page, state.page + 1].filter(number => number >= 0 && number < state.totalPages));
    let previous = -1;
    [...visible].sort((a, b) => a - b).forEach(number => {
      if (previous !== -1 && number - previous > 1) html += `<span class="page-gap">…</span>`;
      html += makeButton(number + 1, number, false, number === state.page);
      previous = number;
    });
    html += makeButton("›", state.page + 1, !page.hasNext, false, "Sljedeća stranica");
    els.pagination.innerHTML = html;
    els.pagination.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
      if (button.disabled) return;
      state.page = Number(button.dataset.page);
      loadProducts();
      document.querySelector("#proizvodi").scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  }

  function renderActiveFilters() {
    const tags = [];
    if (els.search.value.trim()) tags.push([`Pretraga: ${els.search.value.trim()}`, () => { els.search.value = ""; scheduleLoad(); }]);
    if (state.categoryId !== null) {
      const name = state.categories.find(category => String(category.id) === String(state.categoryId))?.name || "Kategorija";
      tags.push([name, () => setCategory("all")]);
    }
    if (els.min.value) tags.push([`Od ${els.min.value} KM`, () => { els.min.value = ""; scheduleLoad(); }]);
    if (els.max.value) tags.push([`Do ${els.max.value} KM`, () => { els.max.value = ""; scheduleLoad(); }]);
    if (els.available.checked) tags.push(["Dostupni", () => { els.available.checked = false; scheduleLoad(); }]);
    els.activeFilters.innerHTML = tags.map((tag, index) => `<span class="filter-tag">${escapeHtml(tag[0])}<button type="button" data-remove="${index}" aria-label="Ukloni filter">×</button></span>`).join("");
    els.activeFilters.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => tags[Number(button.dataset.remove)][1]()));
  }

  function scheduleLoad() {
    state.page = 0;
    clearTimeout(state.timer);
    state.timer = setTimeout(loadProducts, 260);
  }

  function formatPrice(value) {
    const rounded = Math.round(Number(value) * 5) / 5;
    return new Intl.NumberFormat("bs-BA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(rounded);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }

  els.search.addEventListener("input", scheduleLoad);
  els.min.addEventListener("change", scheduleLoad);
  els.max.addEventListener("change", scheduleLoad);
  els.available.addEventListener("change", scheduleLoad);
  els.sort.addEventListener("change", () => { state.page = 0; loadProducts(); });
  document.querySelector("#reset-filters").addEventListener("click", resetFilters);
  document.querySelector("#empty-reset").addEventListener("click", resetFilters);
  document.querySelector("#retry-load").addEventListener("click", () => { loadCategories().then(loadProducts).catch(loadProducts); });
  document.addEventListener("keydown", event => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault(); els.search.focus();
    }
  });

  function resetFilters() {
    els.search.value = ""; els.min.value = ""; els.max.value = ""; els.available.checked = false;
    state.categoryId = null; state.page = 0; renderCategoryShortcuts(); renderCategoryFilters(); loadProducts();
  }

  const themeToggle = document.querySelector("#theme-toggle");
  function setTheme(theme) {
    const dark = theme === "dark";
    document.body.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("novatech-theme", document.body.dataset.theme);
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute("aria-label", dark ? "Uključi svijetlu temu" : "Uključi tamnu temu");
    themeToggle.querySelector(".theme-toggle-icon").textContent = dark ? "☼" : "☾";
    themeToggle.querySelector(".theme-toggle-label").textContent = dark ? "Svijetla tema" : "Tamna tema";
    document.querySelector('meta[name="theme-color"]').content = dark ? "#171a28" : "#f6f7fb";
  }
  themeToggle.addEventListener("click", () => setTheme(document.body.dataset.theme === "dark" ? "light" : "dark"));
  setTheme(localStorage.getItem("novatech-theme") || "light");

  loadCategories().then(loadProducts).catch(error => {
    els.categoryList.innerHTML = "<span class=\"muted\">Kategorije trenutno nisu dostupne.</span>";
    els.grid.innerHTML = ""; els.error.hidden = false;
    document.querySelector("#error-message").textContent = `${error.message} Provjeri da li je aplikacija pokrenuta.`;
  });
})();
