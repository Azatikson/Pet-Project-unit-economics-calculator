const form = document.getElementById("unit-economics-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const priceInput = document.getElementById("price");
    const cogsInput = document.getElementById("cogs");
    const churnInput = document.getElementById("churn");
    const cacInput = document.getElementById("cac");
    const conversionInput = document.getElementById("conversion");

    const priceValue = priceInput.value.trim();
    const cogsValue = cogsInput.value.trim();
    const churnValue = churnInput.value.trim();
    const cacValue = cacInput.value.trim();
    const conversionValue = conversionInput.value.trim();

    if (!priceValue || !cogsValue || !churnValue || !cacValue || !conversionValue) {
        alert("Заполните все поля.")
        return;
    }

    const price = Number(priceValue);
    const cogs = Number(cogsValue);
    const churn = Number(churnValue);
    const cac = Number(cacValue);
    const conversion = Number(conversionValue);

    if (isNaN(price) || isNaN(cogs) || isNaN(churn) || isNaN(cac || isNaN(conversion))) {
        alert("Все значения должны быть числами.");
        return;
    }

    if (price <= 0) {
        alert("Цена должны быть больше нуля.");
        return;
    }
    if (cogs <=0) {
        alert("Переменные затраты не могут быть отрицательными");
        return;
    }
     if (churn <= 0 || churn > 100) {
        alert("Месячный отток должен быть в диапазоне от 0 до 100 (не включая 0).");
        return;
    }
    if (cac <= 0) {
        alert("Стоимость привлечения должна быть больше нуля.");
        return;
    }
    if (conversion < 0 || conversion > 100) {
        alert("Конверсия должна быть в диапазоне от 0 до 100.");
        return;
    }

    // РАСЧЁТЫ
    const churnRate = churn / 100;
    const conversionRate = conversion / 100;

    const ltvPaying = price / churnRate;

    const ltvPerUser = ltvPaying * conversionRate;

    const grossMargin = ((price - cogs) / price) * 100;

    const ltvCacRatio = ltvPerUser / cac;

    // Вердикт
    let verdictText;
    let verdictClass;

    if (ltvCacRatio >= 3) {
        verdictText = "Отличная юнит-экономика";
        verdictClass = "verdict-good";
    } else if (ltvCacRatio >= 1) {
        verdictText = "⚠️ На грани";
        verdictClass = "verdict-warning";
    } else {
        verdictText = "❌ Убыточно";
        verdictClass = "verdict-bad";
    }
    
    // Результат

    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = `
        <h2>Результаты расчёта</h2>
        <div class="metric-card">
            <span class="metric-label">LTV платящего пользователя</span>
            <span class=:metric-value">${ltvPaying.toFixed(2)} ₽</span>
        </div>
        <div class="metric-card">
            <span class="metric-label">LTV на одного привлечённого пользователя</span>
            <span class="metric-value">${ltvPerUser.toFixed(2)} ₽</span>
        </div>
         <div class="metric-card">
        <span class="metric-label">Маржа (gross margin)</span>
        <span class="metric-value">${grossMargin.toFixed(1)}%</span>
        </div>
        <div class="metric-card">
        <span class="metric-label">Соотношение LTV/CAC</span>
        <span class="metric-value">${ltvCacRatio.toFixed(2)}</span>
        </div>
        <div class="verdict ${verdictClass}">
        <span>Вердикт</span>
        <span>${verdictText}</span>
        </div>
        `;

        resultsDiv.style.display = "block";

    
    // console.log("Цена:", priceValue);
    // console.log("Cogs:", cogsValue);
    // console.log("Churn:", churnValue);
    // console.log("CAC:", cacValue);
    // console.log("Конверсия:", conversionValue);

});