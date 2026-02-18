$(document).ready(function() {

    // ==========================================
    // 1. DATA & CONFIGURATION (KEPT EXACTLY AS IS)
    // ==========================================

    const BRANCHES = [
        "Kfar Saba (Oshiland)", "Rehovot", "Petah Tikva", 
        "Haifa (Grand Canyon)", "Krayot", "Ashdod", 
        "Ashkelon", "Nahariya", "Modiin", "Karmiel"
    ];

    const REGIONS = [
        "North Region", "Center (Merkaz) Region", "South Region"
    ];

    const INVENTORY_DATA = {
        "🍿 Concessions (Food)": [
            { name: "Popcorn Kernels (20kg Sack)", norm: 40, supplier: "PopLi" },
            { name: "Popcorn Oil (Yellow) - 10L", norm: 20, supplier: "PopLi" },
            { name: "Popcorn Salt (Flavacol)", norm: 10, supplier: "PopLi" },
            { name: "Small Popcorn Boxes (500ct)", norm: 5, supplier: "PackIt" },
            { name: "Medium Popcorn Boxes (500ct)", norm: 5, supplier: "PackIt" },
            { name: "Large Popcorn Boxes (400ct)", norm: 5, supplier: "PackIt" },
            { name: "Nachos Chips (Bulk Box)", norm: 30, supplier: "TastePerfect" },
            { name: "Cheese Sauce Cans (3kg)", norm: 24, supplier: "TastePerfect" },
            { name: "Jalapeno Slices (Jar)", norm: 12, supplier: "TastePerfect" },
            { name: "Nachos Trays (Plastic)", norm: 200, supplier: "PackIt" }
        ],
        "🥤 Drinks & Syrups": [
            { name: "Coca-Cola Syrup (20L BiB)", norm: 15, supplier: "Central Drinks" },
            { name: "Coca-Cola Zero Syrup (20L BiB)", norm: 15, supplier: "Central Drinks" },
            { name: "Sprite Syrup (20L BiB)", norm: 10, supplier: "Central Drinks" },
            { name: "Fanta Orange Syrup (20L BiB)", norm: 8, supplier: "Central Drinks" },
            { name: "Fuze Tea Peach (20L BiB)", norm: 8, supplier: "Central Drinks" },
            { name: "Mineral Water (500ml Case)", norm: 50, supplier: "Neviot" },
            { name: "Slushy Mix - Red Berry (5L)", norm: 10, supplier: "IceMaster" },
            { name: "Slushy Mix - Blue Raspberry (5L)", norm: 10, supplier: "IceMaster" },
            { name: "Small Drink Cups (1000ct)", norm: 4, supplier: "PackIt" },
            { name: "Large Drink Cups (800ct)", norm: 4, supplier: "PackIt" },
            { name: "Paper Straws (Bulk)", norm: 5000, supplier: "GreenEarth" },
            { name: "Plastic Lids (Universal)", norm: 2000, supplier: "PackIt" }
        ],
        "🍬 Sweets & Snacks": [
            { name: "M&Ms Peanut (Box of 24)", norm: 10, supplier: "Mars" },
            { name: "M&Ms Chocolate (Box of 24)", norm: 8, supplier: "Mars" },
            { name: "Maltesers Bags (Box of 20)", norm: 8, supplier: "Mars" },
            { name: "Skittles Fruits (Box of 24)", norm: 10, supplier: "Mars" },
            { name: "Gummy Bears (150g Bags)", norm: 30, supplier: "Haribo" },
            { name: "Kinder Bueno (Box of 30)", norm: 5, supplier: "Ferrero" },
            { name: "KitKat Chunky (Box of 24)", norm: 5, supplier: "Nestle" },
            { name: "Sour Patch Kids (Box of 12)", norm: 10, supplier: "Import" }
        ],
        "🌭 Hot Food": [
            { name: "Hot Dogs (Premium Beef) - 50ct", norm: 10, supplier: "Zoglos" },
            { name: "Hot Dog Buns (Frozen 50ct)", norm: 10, supplier: "Berman" },
            { name: "Heinz Ketchup Dispenser Pack", norm: 6, supplier: "Diplomat" },
            { name: "Heinz Mustard Dispenser Pack", norm: 4, supplier: "Diplomat" },
            { name: "Hot Dog Paper Boats", norm: 500, supplier: "PackIt" }
        ],
        "🧹 Cleaning & Operations": [
            { name: "Floor Cleaner (Lavender) 5L", norm: 5, supplier: "Sano" },
            { name: "Glass Cleaner Spray", norm: 10, supplier: "Sano" },
            { name: "Heavy Duty Degreaser", norm: 4, supplier: "Sano" },
            { name: "Trash Bags XL (Roll)", norm: 20, supplier: "CleanPro" },
            { name: "Trash Bags L (Roll)", norm: 20, supplier: "CleanPro" },
            { name: "Paper Towels (Industrial Roll)", norm: 12, supplier: "CleanPro" },
            { name: "Hand Soap Refill (5L)", norm: 4, supplier: "Sano" },
            { name: "Toilet Paper (Jumbo Roll)", norm: 24, supplier: "CleanPro" },
            { name: "Ticket Printer Rolls (Thermal)", norm: 30, supplier: "TechSupply" },
            { name: "3D Glasses (Recycle Bin)", norm: 500, supplier: "RealD" }
        ]
    };

    const MOVIE_DB = [
        "Avatar 2", "Oppenheimer", "Barbie", "Dune 2",
        "Deadpool 3", "Inside Out 2", "Gladiator 2",
        "Joker 2", "Mission Impossible 8", "Spider-Man",
        "The Batman 2", "Top Gun 3"
    ];

    const TIME_SLOTS = ["11:00", "13:30", "16:00", "18:30", "21:00", "23:30"];

    // ==========================================
    // 2. PAGE ROUTING LOGIC (THE FIX)
    // ==========================================

    // --- A. LOGIN PAGE LOGIC (LandingScreen.html) ---
    if ($('#loginScreen').length > 0) {
        
        // 1. Login Submit
        $('#btnLoginSubmit').click(function() {
            let email = $("#usernameInput").val().trim();
            let pass = $("#passwordInput").val().trim();
            
            $("#loginError").addClass("d-none");

            // Simple Validation
            if (pass.length < 1) {
                $("#loginError").removeClass("d-none").text("Please enter your password");
                return;
            }

            // Success: Hide Login, Show Role
            $('#loginScreen').addClass('d-none');
            $('#roleScreen').removeClass('d-none').hide().fadeIn(400);
        });

        // 2. Role Selection
        $('.role-btn').click(function() {
            let role = $(this).data("role");
            
            // Logic: Depending on role, show next screen
            $('#roleScreen').addClass('d-none');
            $('#appHeader').removeClass('d-none'); 

            if(role === 'regional') {
                renderRegions();
                $('#branchScreen h4').text("Select Region");
                $('#branchScreen').removeClass('d-none').hide().fadeIn(400);
            } 
            else if(role === 'manager' || role === 'staff') {
                renderBranches();
                $('#branchScreen h4').text("Select Branch Location");
                $('#branchScreen').removeClass('d-none').hide().fadeIn(400);
            }
            else {
                // Procurement/Content go straight to dashboard
                $('#dashboardScreen').removeClass('d-none').hide().fadeIn(400);
            }
        });

        // 3. Branch/Region Selection
        $(document).on('click', '.branch-select-btn, .region-select-btn', function() {
            let locationName = $(this).data("loc");
            
            // *** CRITICAL: Save to LocalStorage so other pages know the branch ***
            localStorage.setItem('activeBranch', locationName); 
            
            $('#headerBranch').text(locationName);
            $('#branchScreen').addClass('d-none');
            $('#dashboardScreen').removeClass('d-none').hide().fadeIn(400);
        });
    }

    // --- B. INVENTORY PAGE LOGIC (InventoryCount.html) ---
    if ($('#inventoryContainer').length > 0) {
        // Load branch name from memory
        let savedBranch = localStorage.getItem('activeBranch');
        if(savedBranch) $('h4.fw-bold').text(savedBranch);

        renderInventory(); 
        
        // Variance Logic (Live Calculation)
        $(document).on("input", ".input-stock", function() {
            let inputVal = $(this).val();
            let norm = $(this).parent().prev().prev().find("span").text();
            let variance = parseInt(norm) - (parseInt(inputVal) || 0);
            let displayObj = $(this).parent().next().find(".variance-val");
            
            displayObj.text(variance > 0 ? "-" + variance : variance);
            if (variance > 0) {
                displayObj.removeClass("text-success").addClass("text-danger");
            } else {
                displayObj.removeClass("text-danger").addClass("text-success");
            }
        });

        $("#btnSync").click(function() {
            let toastEl = document.getElementById('liveToast');
            let toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    }

    // --- C. SCHEDULING PAGE LOGIC (MovieScheduling.html) ---
    if ($('#scheduleWeekInput').length > 0) {
        let savedBranch = localStorage.getItem('activeBranch');
        // Update header if we have a saved branch
        if(savedBranch) {
             // Try to find a header to update, if it exists in your HTML
             $(".d-flex h4").text("Scheduling: " + savedBranch);
        }

        initWeekPicker();
        
        // Manual Mode
        $("#btnManualSchedule").click(function() {
            $("#scheduleModeSelection").addClass("d-none");
            $("#scheduleResults").removeClass("d-none");
            initDragAndDrop();
        });

        // Exit Builder
        $("#btnExitBuilder").click(function() {
            $("#scheduleResults").addClass("d-none");
            $("#scheduleModeSelection").removeClass("d-none");
        });

        // AI Logic
        $("#btnAISchedule").click(function() {
            $("#scheduleModeSelection").addClass("d-none");
            $("#aiWizardContainer").removeClass("d-none");
        });
        
        $("#btnRunAI").click(function() {
            $("#aiWizardContainer").addClass("d-none");
            $("#scheduleLoading").removeClass("d-none");
            setTimeout(function() {
                $("#scheduleLoading").addClass("d-none");
                $("#scheduleResults").removeClass("d-none");
                initDragAndDrop();
                autoFillSchedule();
                $("#aiFeedbackCard").removeClass("d-none");
                $("#aiFeedbackText").html("Optimization Complete. Efficiency: <span class='text-teal fw-bold'>98/100</span>");
            }, 2000);
        });

        // Publish
        $("#btnPublishSchedule").click(function() {
            let myModal = new bootstrap.Modal(document.getElementById('publishConfirmModal'));
            myModal.show();
        });
        
        $("#btnConfirmPublish").click(function() {
            $("#publishConfirmModal").modal('hide');
            let toastEl = document.getElementById('liveToast');
            let toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    }

    // --- D. MANPOWER PAGE LOGIC (ManPowerOptimization.html) ---
    if ($('#manpowerFormCard').length > 0) {
        
        $("#optPreSales").on("input", function() {
            $("#sliderValue").text($(this).val() + "%");
        });

        $("#btnCalcManpower").click(function() {
            let btn = $(this);
            let originalText = btn.html();
            btn.html('<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...');
            
            // Simulation
            setTimeout(() => {
                $("#manpowerFormCard").fadeOut(300, function() {
                    // Mock Calculations
                    let total = 7; 
                    $("#resultStaffCount").text(total);
                    $("#resSnacks").text(3);
                    $("#resCleaners").text(2);
                    $("#resCashiers").text(1);
                    $("#resScreening").text(1);

                    $("#manpowerResults").removeClass("d-none").hide().fadeIn(400);
                    btn.html(originalText);
                });
            }, 1000);
        });

        $("#btnResetManpower").click(function() {
            $("#manpowerResults").fadeOut(300, function() {
                $("#manpowerFormCard").fadeIn(400);
            });
        });
    }

    // ==========================================
    // 3. HELPER FUNCTIONS (KEPT FROM ORIGINAL)
    // ==========================================

    function renderBranches() {
        $("#branchList").empty().removeClass("d-grid gap-3 mx-auto").addClass("row g-3").css("max-width", "");
        BRANCHES.forEach(branch => {
            $("#branchList").append(`
                <div class="col-12 col-md-6">
                    <button class="btn btn-surface w-100 py-3 branch-select-btn" data-loc="${branch}">
                        ${branch}
                    </button>
                </div>
            `);
        });
    }

    function renderRegions() {
        $("#branchList").empty().removeClass("row g-3").addClass("d-grid gap-3 mx-auto").css("max-width", "400px");
        REGIONS.forEach(region => {
            $("#branchList").append(`
                <button class="btn btn-surface w-100 py-3 region-select-btn" data-loc="${region}">
                    <span class="fw-bold fs-5">${region}</span>
                </button>
            `);
        });
    }

    function renderInventory() {
        $("#inventoryContainer").empty();
        for (const [category, items] of Object.entries(INVENTORY_DATA)) {
            $("#inventoryContainer").append(`<h5 class="category-header fw-bold">${category}</h5>`);
            items.forEach((item) => {
                let lastCount = Math.floor(Math.random() * item.norm);
                $("#inventoryContainer").append(`
                    <div class="card bg-surface border-0 p-3 mb-2">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fw-bold m-0 fs-5">${item.name}</h6>
                            <span class="badge supplier-badge">${item.supplier}</span>
                        </div>
                        <div class="row align-items-end text-center g-2">
                            <div class="col-3 text-start">
                                <small class="label-standard d-block mb-1">Standard</small>
                                <span class="value-standard font-monospace">${item.norm}</span>
                            </div>
                            <div class="col-3">
                                <small class="text-muted d-block mb-1">Last</small>
                                <div class="box-last-count">${lastCount}</div>
                            </div>
                            <div class="col-3">
                                <small class="text-teal d-block mb-1">Count</small>
                                <input type="number" class="form-control bg-dark text-white border-secondary input-stock text-center fw-bold" placeholder="0">
                            </div>
                            <div class="col-3 text-end">
                                <small class="text-muted d-block mb-1">Diff</small>
                                <span class="fs-4 font-monospace variance-val text-success">0</span>
                            </div>
                        </div>
                    </div>
                `);
            });
        }
    }

    function initDragAndDrop() {
        const library = $("#movieDraggables");
        library.empty();
        MOVIE_DB.forEach(movie => {
            const chip = $(`<div class="draggable-item" draggable="true">${movie}</div>`);
            chip.on("dragstart", function(e) {
                e.originalEvent.dataTransfer.setData("text/plain", movie);
                e.originalEvent.dataTransfer.effectAllowed = "copy";
                $(this).css("opacity", "0.5");
            });
            chip.on("dragend", function() { $(this).css("opacity", "1"); });
            library.append(chip);
        });
        buildScheduleGrid();
    }

    function buildScheduleGrid() {
        const headerRow = $("#gridHeaderRow");
        const body = $("#gridBody");
        headerRow.find("th:not(:first)").remove();
        body.empty();

        let weekVal = $("#scheduleWeekInput").val(); 
        let startDate = getTuesdayDate(weekVal);

        for (let i = 0; i < 8; i++) {
            let currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + i);
            let dayName = currentDay.toLocaleDateString('en-US', { weekday: 'short' });
            let dayDate = currentDay.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            headerRow.append(`<th>${dayName}<br><span class="small text-muted fw-normal">${dayDate}</span></th>`);
        }

        TIME_SLOTS.forEach(time => {
            let row = $(`<tr></tr>`);
            row.append(`<td class="fw-bold text-center align-middle text-muted">${time}</td>`);
            for (let i = 0; i < 8; i++) {
                let cell = $(`<td class="drop-zone" data-day="${i}" data-time="${time}"></td>`);
                cell.on("dragover", function(e) { e.preventDefault(); $(this).addClass("drag-over"); });
                cell.on("dragleave", function() { $(this).removeClass("drag-over"); });
                cell.on("drop", function(e) {
                    e.preventDefault();
                    $(this).removeClass("drag-over");
                    let movieName = e.originalEvent.dataTransfer.getData("text/plain");
                    $(this).empty(); 
                    let eventChip = $(`
                        <div class="scheduled-event animate-slide-in">
                            <span>${movieName}</span>
                            <i class="fa-solid fa-xmark remove-event ms-2"></i>
                        </div>
                    `);
                    eventChip.find(".remove-event").click(function() { $(this).parent().remove(); });
                    $(this).append(eventChip);
                });
                row.append(cell);
            }
            body.append(row);
        });
    }

    function getTuesdayDate(weekVal) {
        let date = new Date(); 
        if (weekVal) {
            let year = parseInt(weekVal.substring(0, 4));
            let week = parseInt(weekVal.substring(6));
            let simple = new Date(year, 0, 4); 
            let dayShift = (simple.getDay() || 7) - 1; 
            let isoMonday = new Date(year, 0, 4 - dayShift + (week - 1) * 7);
            date = new Date(isoMonday);
            date.setDate(isoMonday.getDate() + 1); 
        }
        return date;
    }

    function autoFillSchedule() {
        $(".drop-zone").each(function() {
            $(this).empty();
            if(Math.random() > 0.6) { 
                let randomMovie = MOVIE_DB[Math.floor(Math.random() * MOVIE_DB.length)];
                let eventChip = $(`
                    <div class="scheduled-event animate-slide-in">
                        <span>${randomMovie}</span>
                        <i class="fa-solid fa-xmark remove-event ms-2"></i>
                    </div>
                `);
                eventChip.find(".remove-event").click(function() { $(this).parent().remove(); });
                $(this).append(eventChip);
            }
        });
    }

    function initWeekPicker() {
        const input = document.getElementById("scheduleWeekInput");
        const displayDates = document.getElementById("weekDateDisplay");
        const displayWeek = document.getElementById("visualWeekDisplay");
        const container = document.querySelector(".picker-container");

        let today = new Date();
        let currentWeekStr = getISOWeekString(today);
        if(input) {
            input.value = currentWeekStr;
            updateFromWeek(currentWeekStr);
            
            $(input).on("change", function() {
                if(this.value) updateFromWeek(this.value);
            });
        }

        function updateFromWeek(weekVal) {
            let year = parseInt(weekVal.substring(0, 4));
            let week = parseInt(weekVal.substring(6));
            let simple = new Date(year, 0, 4); 
            let dayShift = (simple.getDay() || 7) - 1; 
            let isoMonday = new Date(year, 0, 4 - dayShift + (week - 1) * 7);
            let tuesdayStart = new Date(isoMonday);
            tuesdayStart.setDate(isoMonday.getDate() + 1);
            let tuesdayEnd = new Date(tuesdayStart);
            tuesdayEnd.setDate(tuesdayStart.getDate() + 7);
            let startStr = tuesdayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            let endStr = tuesdayEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if(displayDates) $(displayDates).text(`${startStr} - ${endStr}`);
            if(displayWeek) $(displayWeek).text(`Week ${week}, ${year}`);
        }

        function getISOWeekString(date) {
            let d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            let dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            let year = d.getUTCFullYear();
            let weekNo = Math.ceil(( ( (d - new Date(Date.UTC(year,0,1))) / 86400000) + 1)/7);
            return `${year}-W${weekNo.toString().padStart(2, '0')}`;
        }
    }

});