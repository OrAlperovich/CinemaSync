$(document).ready(function() {

    // ==========================================
    // 1. DATA & CONFIGURATION
    // ==========================================

    const BRANCHES = [
        "Kfar Saba (Oshiland)", "Rehovot", "Petah Tikva", 
        "Haifa (Grand Canyon)", "Krayot", "Ashdod", 
        "Ashkelon", "Nahariya", "Modiin", "Karmiel"
    ];

    const REGIONS = [
        "North Region", "Center (Merkaz) Region", "South Region"
    ];

    // 45 Items categorized
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

    const SCHEDULE_DATA = [
        { day: "Sunday", movies: ["Paw Patrol 2 (10:00)", "Gladiator 2 (14:00)"] },
        { day: "Monday", movies: ["Gladiator 2 (11:00)", "Dune 2 (20:00)"] },
        { day: "Tuesday", movies: ["Mission Impossible 8 (18:00)", "Paw Patrol 2 (15:00)"] }
    ];

    // ==========================================
    // 2. STATE MANAGEMENT
    // ==========================================
    let userRole = null;
    let selectedLocation = ""; 
    let navigationStack = ["loginScreen"];

    // ==========================================
    // 3. LOGIN & NAVIGATION LOGIC
    // ==========================================
    
    // Login Submit
    $("#btnLoginSubmit").click(function() {
        let email = $("#usernameInput").val().trim();
        let pass = $("#passwordInput").val().trim();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        $("#loginError").addClass("d-none");

        if (!emailRegex.test(email)) {
            $("#loginError").removeClass("d-none").text("Please enter a valid email (e.g., name@hot.com)");
            return;
        }

        if (pass.length < 1) {
            $("#loginError").removeClass("d-none").text("Please enter your password");
            return;
        }

        navigateTo("roleScreen");
    });

    // Navigation Helper
    function navigateTo(screenId) {
        $(".screen").addClass("d-none").removeClass("active-screen");
        $("#" + screenId).removeClass("d-none").addClass("active-screen");
        navigationStack.push(screenId);
        
        // Header Visibility Logic
        if(screenId === "loginScreen" || screenId === "roleScreen") {
            $("#appHeader").addClass("d-none");
        } else {
            $("#appHeader").removeClass("d-none");
        }
        
        // Dynamic Header Title
        let title = "Dashboard";
        if(screenId === "inventoryScreen") title = "Inventory";
        if(screenId === "schedulingScreen") title = "Scheduling";
        if(screenId === "manpowerScreen") title = "Manpower";
        if(screenId === "branchScreen") {
            title = userRole === "regional" ? "Select Region" : "Select Branch";
        }
        
        $("#headerTitle").text(title);
        $("#headerBranch").text(selectedLocation);
    }

    // Back Button
    $("#btnBack").click(function() {
        if(navigationStack.length > 1) {
            navigationStack.pop(); 
            let prevScreen = navigationStack[navigationStack.length - 1]; 
            
            $(".screen").addClass("d-none");
            $("#" + prevScreen).removeClass("d-none");
            
            if(prevScreen === "loginScreen" || prevScreen === "roleScreen") {
                $("#appHeader").addClass("d-none");
            }
            
            let title = "Dashboard";
            if(prevScreen === "inventoryScreen") title = "Inventory";
            if(prevScreen === "branchScreen") {
                 title = userRole === "regional" ? "Select Region" : "Select Branch";
            }
            $("#headerTitle").text(title);
        }
    });

    // Global Logout
    $("#btnLogout").click(function() {
        navigationStack = ["loginScreen"];
        userRole = null;
        selectedLocation = "";
        
        // Clear Inputs
        $("#usernameInput").val("");
        $("#passwordInput").val("");
        
        // Return to Start
        $(".screen").addClass("d-none");
        $("#loginScreen").removeClass("d-none");
        $("#appHeader").addClass("d-none");
    });

    // ==========================================
    // 4. ROLE SELECTION LOGIC
    // ==========================================
    $(".role-btn").click(function() {
        userRole = $(this).data("role");
        
        // Reset Modules visibility
        $("#moduleInventory, #moduleScheduling, #moduleManpower").hide();

        if (userRole === "manager") {
            $("#branchScreen h4").text("Select Branch Location");
            renderBranches(); 
            navigateTo("branchScreen");
        } 
        else if (userRole === "staff") {
            $("#branchScreen h4").text("Select Branch Location");
            renderBranches(); 
            navigateTo("branchScreen");
        }
        else if (userRole === "regional") {
            $("#branchScreen h4").text("Select Region");
            renderRegions(); 
            navigateTo("branchScreen");
        }
        else if (userRole === "procurement") {
            selectedLocation = "Holon, Main Office";
            $("#moduleInventory").show();
            navigateTo("dashboardScreen");
        } 
        else if (userRole === "content") {
            selectedLocation = "Holon, Main Office";
            $("#moduleScheduling").show();
            navigateTo("dashboardScreen");
        } 
    });

    // ==========================================
    // 5. LOCATION SELECTION LOGIC
    // ==========================================
    
    function renderBranches() {
        $("#branchList").empty();
        // Reset to Grid Layout
        $("#branchList").removeClass("d-grid gap-3 mx-auto").addClass("row g-3").css("max-width", "");
        
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
        $("#branchList").empty();
        // Reset to Vertical Stack Layout
        $("#branchList").removeClass("row g-3").addClass("d-grid gap-3 mx-auto").css("max-width", "400px");
        
        REGIONS.forEach(region => {
            $("#branchList").append(`
                <button class="btn btn-surface w-100 py-3 region-select-btn" data-loc="${region}">
                    <div class="d-flex align-items-center justify-content-center gap-3">
                        <span class="fw-bold fs-5">${region}</span>
                    </div>
                </button>
            `);
        });
    }

    $(document).on("click", ".branch-select-btn", function() {
        selectedLocation = $(this).data("loc");
        
        // Logic: Who sees what?
        if (userRole === "manager") {
            $("#moduleInventory, #moduleManpower").show();
        } else if (userRole === "staff") {
            $("#moduleInventory").show(); 
        }
        navigateTo("dashboardScreen");
    });

    $(document).on("click", ".region-select-btn", function() {
        selectedLocation = $(this).data("loc");
        // Regional Manager sees EVERYTHING
        $("#moduleInventory, #moduleScheduling, #moduleManpower").show();
        navigateTo("dashboardScreen");
    });

    // ==========================================
    // UPDATED MODULE NAVIGATION
    // ==========================================

    // ==========================================
    // UPDATED MODULE NAVIGATION
    // ==========================================

    // 1. Dashboard Module Clicks
    $(".module-card").click(function() {
        let target = $(this).data("module");
        
        // INTERCEPT: If clicking Scheduling, check if we need to pick a branch
        if(target === "schedulingScreen") {
            // If user is HQ (Content/Procurement) or Regional, they must pick a branch now
            if (userRole === "content" || userRole === "regional" || userRole === "procurement") {
                renderScheduleBranches();
                navigateTo("scheduleBranchScreen");
                return; // Stop here, don't go to scheduling yet
            }
        }

        if(target === "inventoryScreen") renderInventory();
        navigateTo(target);
    });

    // 2. Helper: Render Branches (Clean Text Only)
    function renderScheduleBranches() {
        $("#scheduleBranchList").empty();
        BRANCHES.forEach(branch => {
            $("#scheduleBranchList").append(`
                <div class="col-12 col-md-6">
                    <button class="btn btn-surface w-100 py-3 schedule-branch-btn" data-loc="${branch}">
                        <span class="fw-bold">${branch}</span>
                    </button>
                </div>
            `);
        });
    }

    // 3. Handle Selection
    $(document).on("click", ".schedule-branch-btn", function() {
        let chosenBranch = $(this).data("loc");
        
        // Update 1: Global Header
        $("#headerBranch").text(chosenBranch); 
        
        // Update 2: The "Middle" Text inside the Scheduling Block
        $("#scheduleContextBranch").html(`<i class="fa-solid fa-location-dot me-2"></i>${chosenBranch}`);

        navigateTo("schedulingScreen");
    });

    // ==========================================
    // 6. INVENTORY MODULE LOGIC
    // ==========================================
    function renderInventory() {
        $("#inventoryContainer").empty();
        
        for (const [category, items] of Object.entries(INVENTORY_DATA)) {
            
            // Category Header
            $("#inventoryContainer").append(`<h5 class="category-header fw-bold">${category}</h5>`);

            items.forEach((item, index) => {
                // Mock "Last Count" Data
                let lastCount = Math.floor(Math.random() * item.norm);

                $("#inventoryContainer").append(`
                    <div class="card bg-surface border-0 p-3 mb-2">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fw-bold m-0 fs-5">${item.name}</h6>
                            <span class="badge supplier-badge">${item.supplier}</span>
                        </div>
                        
                        <div class="row align-items-end text-center g-2">
                            <div class="col-3 text-start">
                                <small class="label-standard d-block mb-1">Standard Amount</small>
                                <span class="value-standard font-monospace">${item.norm}</span>
                            </div>
                            <div class="col-3">
                                <small class="text-muted d-block mb-1">Last Count</small>
                                <div class="box-last-count">${lastCount}</div>
                            </div>
                            <div class="col-3">
                                <small class="text-teal d-block mb-1">Count Now</small>
                                <input type="number" class="form-control bg-dark text-white border-secondary input-stock text-center fw-bold" placeholder="0">
                            </div>
                            <div class="col-3 text-end">
                                <small class="text-muted d-block mb-1">Difference</small>
                                <span class="fs-4 font-monospace variance-val text-success">0</span>
                            </div>
                        </div>
                    </div>
                `);
            });
        }
    }

    // Variance Calculation
    $(document).on("input", ".input-stock", function() {
        let inputVal = $(this).val();
        let norm = $(this).parent().prev().prev().find("span").text(); // Navigate up 2 columns to find Norm
        
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

    // ==========================================
    // 7. SCHEDULING MODULE LOGIC (Upgraded)
    // ==========================================
    
    const MOVIE_DB = [
        "Avatar 2", "Oppenheimer", "Barbie", "Dune 2",
        "Deadpool 3", "Inside Out 2", "Gladiator 2",
        "Joker 2", "Mission Impossible 8", "Spider-Man",
        "The Batman 2", "Top Gun 3"
    ];

    // 11:00 start to 23:30 late show
    const TIME_SLOTS = ["11:00", "13:30", "16:00", "18:30", "21:00", "23:30"];

    // --- MANUAL MODE ---
    $("#btnManualSchedule").click(function() {
        $("#scheduleModeSelection").addClass("d-none");
        $("#scheduleResults").removeClass("d-none");
        $("#aiFeedbackCard").addClass("d-none"); 
        $("#aiFeedbackText").empty();
        initDragAndDrop();
    });

    $("#btnExitBuilder").click(function() {
        $("#scheduleResults").addClass("d-none");
        $("#scheduleModeSelection").removeClass("d-none");
        $("#aiFeedbackCard").addClass("d-none");
    });

    // --- AI WIZARD LOGIC ---
    $("#btnAISchedule").click(function() {
        $("#scheduleModeSelection").addClass("d-none");
        $("#aiWizardContainer").removeClass("d-none");
        $("#scheduleResults").addClass("d-none"); 
        $("#aiFeedbackCard").addClass("d-none"); 
        $("#aiFeedbackText").empty();
    });

    $("#btnCancelAI").click(function() {
        $("#aiWizardContainer").addClass("d-none");
        $("#scheduleModeSelection").removeClass("d-none");
        $("#aiFeedbackCard").addClass("d-none");
    });

    $("#btnRunAI").click(function() {
        $("#aiWizardContainer").addClass("d-none");
        $("#scheduleLoading").removeClass("d-none");
        $("#scheduleLoading h5").text("Your AI Companion is on the job!");
        $("#scheduleLoading small").text("It will only take a moment...");

        setTimeout(function() {
            $("#scheduleLoading").addClass("d-none");
            $("#scheduleResults").removeClass("d-none");
            
            initDragAndDrop();
            autoFillSchedule(); 

            // Generate Feedback
            let activeStrategies = [];
            $("#aiStrategyForm input:checked").each(function() { activeStrategies.push($(this).next().text()); });
            
            const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            let feedback = `Optimization Complete. Integrated <strong>${activeStrategies.length} strategic criteria</strong>. `;
            if(activeStrategies.includes("Prioritize Global Blockbusters")) {
                feedback += `Blockbuster visibility is maximized to <strong>${getRandomInt(92, 98)}%</strong>. `;
            }
            feedback += `Overall efficiency rating: <span class='text-teal fw-bold'>${getRandomInt(94, 99)}/100</span>.`;

            $("#aiFeedbackText").html(feedback);
            $("#aiFeedbackCard").removeClass("d-none");
        }, 3000);
    });

    // --- PUBLISH LOGIC ---
    $("#btnPublishSchedule").click(function() {
        let currentWeekText = $("#visualWeekDisplay").text();
        $("#publishWeekTarget").text(currentWeekText);
        let myModal = new bootstrap.Modal(document.getElementById('publishConfirmModal'));
        myModal.show();
    });

    $("#btnConfirmPublish").click(function() {
        $("#publishConfirmModal").modal('hide');
        $(".modal-backdrop").remove();
        let toastEl = document.getElementById('liveToast');
        let toast = new bootstrap.Toast(toastEl);
        toast.show();
    });

    // --- GRID BUILDER (Fixed Borders) ---
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
            
            // FIX: Removed 'border-start' from the last day logic
            let classExtra = i === 7 ? "text-teal" : ""; 
            
            headerRow.append(`<th class="${classExtra}">${dayName}<br><span class="small text-muted fw-normal">${dayDate}</span></th>`);
        }

        TIME_SLOTS.forEach(time => {
            let row = $(`<tr></tr>`);
            row.append(`<td class="fw-bold text-center align-middle text-muted">${time}</td>`);
            
            for (let i = 0; i < 8; i++) {
                let cell = $(`<td class="drop-zone" data-day="${i}" data-time="${time}"></td>`);
                
                // FIX: Removed the white border check for the last column
                // if(i === 7) cell.addClass("border-start border-secondary"); <-- DELETED

                cell.on("dragover", function(e) { e.preventDefault(); $(this).addClass("drag-over"); });
                cell.on("dragleave", function() { $(this).removeClass("drag-over"); });
                
                cell.on("drop", function(e) {
                    e.preventDefault();
                    $(this).removeClass("drag-over");
                    let movieName = e.originalEvent.dataTransfer.getData("text/plain");
                    
                    $(this).empty(); // One movie per slot rule

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

    // Updated AI to respect "One Per Slot"
    function autoFillSchedule() {
        $(".drop-zone").each(function() {
            // Clear existing first to ensure clean AI generation
            $(this).empty();

            if(Math.random() > 0.6) { // 40% fill rate for realism
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
    // ==========================================
    // 8. MANPOWER OPTIMIZATION LOGIC
    // ==========================================
    
    // Slider Text Update
    $("#optPreSales").on("input", function() {
        $("#sliderValue").text($(this).val() + "%");
    });

    // Run Calculation
    $("#btnCalcManpower").click(function() {
        
        let btn = $(this);
        let originalText = btn.html();

        // 1. Show Loading State
        btn.html('<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Model...');
        btn.prop('disabled', true); 

        // 2. Gather Data (Score Logic)
        let totalScore = 3; // Start with 3 employees minimum
        
        let day = $("#optDayType").val();
        let shift = $("#optShift").val();
        let weather = $("#optWeather").val();
        let event = $("#optEvents").val();
        let isHoliday = $("#optHoliday").is(":checked");
        let isPremiere = $("#optPremiere").is(":checked");
        let preSales = parseInt($("#optPreSales").val());

        // Logic Engine (Increase totalScore based on criteria)
        if (day === "weekend") totalScore += 3;
        if (shift === "afternoon") totalScore += 1;
        if (shift === "night") totalScore += 2;
        if (weather === "rainy") totalScore += 2; 
        if (weather === "cloudy") totalScore += 1;
        if (event === "major") totalScore += 3;
        if (isHoliday) totalScore += 4;
        if (isPremiere) totalScore += 4;
        if (preSales > 30) totalScore += 2;
        if (preSales > 60) totalScore += 2;
        if (preSales > 80) totalScore += 2;

        // 3. Distribute Roles
        // Logic: 
        // - Always need at least 1 Screening Employee.
        // - Of the remaining: 
        //   - 50% Snacks (Busiest)
        //   - 30% Cleaners
        //   - 20% Cashiers
        
        let screening = 1;
        if (totalScore > 15) screening = 2; // Add a 2nd projectionist if huge shift

        let remainder = totalScore - screening;
        
        let snacks = Math.ceil(remainder * 0.5);   // 50%
        let cleaners = Math.floor(remainder * 0.3); // 30%
        
        // Cashiers get whatever is left, but ensure at least 1 if remainder exists
        let cashiers = remainder - snacks - cleaners; 
        if (cashiers < 1 && remainder > 0) {
            cashiers = 1;
            // Balance out by taking from snacks if needed
            if (snacks > 1) snacks--;
        }

        // 4. Reveal Results
        setTimeout(() => {
            $("#manpowerFormCard").fadeOut(300, function() {
                
                // Set Global Total
                $("#resultStaffCount").text(totalScore);

                // Set Breakdown Numbers
                $("#resSnacks").text(snacks);
                $("#resCleaners").text(cleaners);
                $("#resCashiers").text(cashiers);
                $("#resScreening").text(screening);

                // Show Results
                $("#manpowerResults").removeClass("d-none").hide().fadeIn(400);
                
                // Reset Button
                btn.html(originalText);
                btn.prop('disabled', false);
            });
        }, 1000);
    });

    // Reset Button
    $("#btnResetManpower").click(function() {
        $("#manpowerResults").fadeOut(300, function() {
            $("#manpowerFormCard").fadeIn(400);
        });
    });

   // ==========================================
    // 9. DYNAMIC DATE LOGIC (Tuesday-to-Tuesday Cycle)
    // ==========================================
    
    initWeekPicker();

    function initWeekPicker() {
        const input = document.getElementById("scheduleWeekInput");
        const displayDates = document.getElementById("weekDateDisplay");
        const displayWeek = document.getElementById("visualWeekDisplay");
        const container = document.querySelector(".picker-container");

        // 1. Set Default to Current Week
        let today = new Date();
        let currentWeekStr = getISOWeekString(today);
        input.value = currentWeekStr;
        updateFromWeek(currentWeekStr);

        // 2. FORCE OPEN (Click anywhere logic)
        $(container).on("click", function() {
            try {
                input.showPicker(); 
            } catch (err) {
                input.focus();
                input.click();
            }
        });

        // 3. Listen for Selection
        $(input).on("change", function() {
            if(this.value) {
                updateFromWeek(this.value);
            }
        });

        function updateFromWeek(weekVal) {
            // weekVal is "2026-W06"
            let year = parseInt(weekVal.substring(0, 4));
            let week = parseInt(weekVal.substring(6));

            // A. Find the MONDAY of this ISO Week (Standard Start)
            // (We use a robust ISO calculation here)
            let simple = new Date(year, 0, 4); // Jan 4 is always Week 1
            let dayShift = (simple.getDay() || 7) - 1; 
            let isoMonday = new Date(year, 0, 4 - dayShift + (week - 1) * 7);

            // B. Shift to TUESDAY (Operational Start)
            // Monday + 1 Day = Tuesday
            let tuesdayStart = new Date(isoMonday);
            tuesdayStart.setDate(isoMonday.getDate() + 1);

            // C. Calculate END TUESDAY (7 Days later)
            let tuesdayEnd = new Date(tuesdayStart);
            tuesdayEnd.setDate(tuesdayStart.getDate() + 7);

            // D. Format Dates
            let startStr = tuesdayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            let endStr = tuesdayEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            // E. Update UI
            // Even though the calendar highlights Mon-Sun, we tell the user:
            // "We are scheduling from Tue [Date] to Tue [Date]"
            $(displayDates).text(`${startStr} - ${endStr}`);
            $(displayWeek).text(`Week ${week}, ${year}`);
        }

        // Helper: Get ISO Week string for "today"
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