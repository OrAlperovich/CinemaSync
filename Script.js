$(document).ready(function() {

    // Global Header Branch Sync
    let activeBranch = localStorage.getItem('activeBranch');
    if(activeBranch) $('#navBranchDisplay').text(activeBranch);

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
    // 2. GLOBAL BUTTON LOGIC
    // ==========================================
    
    // LOGOUT (Works on all pages)
    $('body').on('click', '#btnLogout, .btn-logout', function(e) {
        e.preventDefault();
        
        // Wipe everything from memory
        localStorage.removeItem('activeBranch'); 
        localStorage.removeItem('userRole'); 
        
        // Force the text to reset visually just in case
        $('#headerBranch').text("Select Branch");
        
        window.location.href = "LandingScreen.html"; 
    });

    // ==========================================
    // 3. PAGE SPECIFIC LOGIC
    // ==========================================

    // --- A. LANDING SCREEN LOGIC ---
    if ($('#loginScreen').length > 0) {
        
        // 1. SMART NAVIGATION (The Fix)
        // We only skip login if the URL says "?return=true" AND we have a branch saved.
        // If you just Refresh (no ?return=true), this block is skipped -> Login shows.
        // 1. SMART NAVIGATION
        const urlParams = new URLSearchParams(window.location.search);
        let savedBranch = localStorage.getItem('activeBranch');
        
        if (urlParams.has('return') && savedBranch) {
            $('#loginScreen').addClass('d-none');
            $('#appHeader').removeClass('d-none');
            $('#headerBranch').text(savedBranch);
            
            // *** THE FIX: Check permissions when returning from an assignment ***
            applyRolePermissions();
            
            $('#dashboardScreen').removeClass('d-none');
        }

        // 2. BACK BUTTON (The full sequence)
        $('#btnBack').click(function() {
            // Step 1: Dashboard -> Branch Selection (Or Role Selection for HQ)
            if (!$('#dashboardScreen').hasClass('d-none')) {
                $('#dashboardScreen').addClass('d-none');
                
                localStorage.removeItem('activeBranch');
                let role = localStorage.getItem('userRole');
                
                // If HQ Role, skip branch screen and go straight to roles
                if (role === 'procurement' || role === 'content') {
                    $('#headerBranch').text("Select Branch");
                    $('#roleScreen').removeClass('d-none').hide().fadeIn(300);
                    return;
                }
                
                // If Regional or Branch Manager/Staff
                if (role === 'regional') {
                    renderRegions();
                    $('#branchScreen h4').text("Select Region");
                    $('#headerBranch').text("Select Region"); 
                } else {
                    renderBranches();
                    $('#branchScreen h4').text("Select Branch");
                    $('#headerBranch').text("Select Branch"); 
                }
                
                $('#branchScreen').removeClass('d-none').hide().fadeIn(300);
                return;
            }
            
            // Step 2: Branch Selection -> Role Selection (This fixes the "unresponsive" bug)
            if (!$('#branchScreen').hasClass('d-none')) {
                $('#branchScreen').addClass('d-none');
                $('#roleScreen').removeClass('d-none').hide().fadeIn(300);
                return;
            }

            // Step 3: THIS IS YOUR SEGMENT (Role Selection -> Login)
            if (!$('#roleScreen').hasClass('d-none')) {
                $('#roleScreen').addClass('d-none');
                $('#appHeader').addClass('d-none'); 
                
                // *** CLEARS THE CREDENTIALS ***
                $("#usernameInput").val("");
                $("#passwordInput").val("");
                
                $('#loginScreen').removeClass('d-none').hide().fadeIn(300);
                return;
            }
        });

        // 3. Login Submit
        $('#btnLoginSubmit').click(function() {
            let email = $("#usernameInput").val().trim();
            let pass = $("#passwordInput").val().trim();
            $("#loginError").addClass("d-none");

            if (pass.length < 1) {
                $("#loginError").removeClass("d-none").text("Please enter your password");
                return;
            }

            // Success
            $('#loginScreen').addClass('d-none');
            $('#appHeader').removeClass('d-none'); 
            $('#roleScreen').removeClass('d-none').hide().fadeIn(400);
        });

        // 4. Role Selection (HQ Routing)
        $('.role-btn').click(function() {
            let role = $(this).data("role");
            localStorage.setItem('userRole', role);
            
            $('#roleScreen').addClass('d-none');
            
            if (role === 'regional') {
                renderRegions();
                $('#branchScreen h4').text("Select Region");
                $('#branchScreen').removeClass('d-none').hide().fadeIn(400);
            } 
            else if (role === 'manager' || role === 'staff') {
                renderBranches();
                $('#branchScreen h4').text("Select Branch");
                $('#branchScreen').removeClass('d-none').hide().fadeIn(400);
            } 
            else if (role === 'procurement' || role === 'content') {
                // Skip the branch screen entirely for HQ roles
                localStorage.setItem('activeBranch', "Holon Main Office");
                $('#headerBranch').text("Holon Main Office"); 
                
                applyRolePermissions();
                $('#dashboardScreen').removeClass('d-none').hide().fadeIn(400);
            }
        });

        // 5. Branch Selection
        $(document).on('click', '.branch-select-btn, .region-select-btn', function() {
            let locationName = $(this).data("loc");
            localStorage.setItem('activeBranch', locationName); 
            $('#headerBranch').text(locationName);
            
            $('#branchScreen').addClass('d-none');
            
            // *** THE FIX: Check permissions before showing the Dashboard ***
            applyRolePermissions(); 
            
            $('#dashboardScreen').removeClass('d-none').hide().fadeIn(400);
        });
    }

    // --- B. INVENTORY PAGE LOGIC ---
    if ($('#inventoryContainer').length > 0) {
        renderInventory(); 
        
        $(document).on("input", ".input-stock", function() {
            let inputVal = $(this).val();
            let norm = $(this).parent().prev().prev().find("span").text();
            let variance = parseInt(norm) - (parseInt(inputVal) || 0);
            let displayObj = $(this).parent().next().find(".variance-val");
            displayObj.text(variance > 0 ? "-" + variance : variance);
            if (variance > 0) displayObj.removeClass("text-success").addClass("text-danger");
            else displayObj.removeClass("text-danger").addClass("text-success");
        });

        $("#btnSync").click(function() {
            let toastEl = document.getElementById('liveToast');
            let toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    }

    // --- C. SCHEDULING PAGE LOGIC ---
    if ($('#scheduleWeekInput').length > 0) {
        let savedBranch = localStorage.getItem('activeBranch');
        if(savedBranch) $(".d-flex h4").text("Scheduling: " + savedBranch);
        initWeekPicker();

        // 0. Safely Close AI Feedback (Hides it instead of deleting it)
        $("#btnHideFeedback").click(function() {
            $("#aiFeedbackCard").addClass("d-none");
        });
        
        // 1. Enter Manual Mode (Locks Picker)
        $("#btnManualSchedule").click(function() {
            $("#scheduleModeSelection").addClass("d-none");
            $("#scheduleResults").removeClass("d-none");
            
            // Lock the Date Picker
            $(".picker-container").css({"pointer-events": "none", "opacity": "0.6"});
            
            initDragAndDrop();
        });

        // 2. Exit Builder (Unlocks Picker & Clears AI Message)
        $("#btnExitBuilder").click(function() {
            $("#scheduleResults").addClass("d-none");
            $("#scheduleModeSelection").removeClass("d-none");
            
            // Unlock the Date Picker
            $(".picker-container").css({"pointer-events": "auto", "opacity": "1"});
            
            // *** THE FIX: Hide the AI Feedback card so it resets ***
            $("#aiFeedbackCard").addClass("d-none");
        });

        // 3. Enter AI Wizard (Locks Picker)
        $("#btnAISchedule").click(function() {
            $("#scheduleModeSelection").addClass("d-none");
            $("#aiWizardContainer").removeClass("d-none");
            
            // Lock the Date Picker
            $(".picker-container").css({"pointer-events": "none", "opacity": "0.6"});
        });

        // 4. Cancel AI Wizard (Unlocks Picker)
        $("#btnCancelAI").click(function() {
            $("#aiWizardContainer").addClass("d-none");
            $("#scheduleModeSelection").removeClass("d-none");
            
            // Unlock the Date Picker
            $(".picker-container").css({"pointer-events": "auto", "opacity": "1"});
        });

        // 5. Run AI (Using Your Custom Checkboxes)
        $("#btnRunAI").click(function() {
            // Read all 8 checkboxes from your UI
            let aiParams = {
                blockbuster: $("#aiOpt1").is(":checked"),
                occupancy:   $("#aiOpt2").is(":checked"),
                family:      $("#aiOpt3").is(":checked"),
                gaps:        $("#aiOpt4").is(":checked"),
                weekend:     $("#aiOpt5").is(":checked"),
                variety:     $("#aiOpt7").is(":checked")
            };

            $("#aiWizardContainer").addClass("d-none");
            $("#scheduleLoading").removeClass("d-none");
            
            setTimeout(function() {
                $("#scheduleLoading").addClass("d-none");
                $("#scheduleResults").removeClass("d-none");
                initDragAndDrop();
                
                // Pass your specific parameters into the auto-filler
                autoFillSchedule(aiParams);
                
                // Calculate Dynamic Efficiency & Message
                let efficiency = 75 + Math.floor(Math.random() * 5); // Base 75-79
                let appliedCount = 0;
                let msgs = [];

                if (aiParams.blockbuster) { efficiency += 4; appliedCount++; msgs.push("Blockbusters"); }
                if (aiParams.occupancy)   { efficiency += 4; appliedCount++; msgs.push("Peak-Hours"); }
                if (aiParams.family)      { efficiency += 3; appliedCount++; msgs.push("Family Slots"); }
                if (aiParams.gaps)        { efficiency += 4; appliedCount++; msgs.push("Tight Turnovers"); }
                if (aiParams.weekend)     { efficiency += 5; appliedCount++; msgs.push("Weekends"); }
                if (aiParams.variety)     { efficiency += 2; appliedCount++; msgs.push("Variety"); }

                // Cap efficiency at 99
                if (efficiency > 99) efficiency = 99;

                let summaryText = appliedCount > 0 
                    ? `Optimized for: ${msgs.join(", ")}.` 
                    : "Standard Balanced Schedule applied.";

                // Inject Dynamic Results
                $("#aiFeedbackCard").removeClass("d-none");
                $("#aiFeedbackText").html(`${summaryText} Efficiency: <span class='text-teal fw-bold'>${efficiency}/100</span>`);
            }, 2000);
        });

        // 6. Publish Schedule 
        $("#btnPublishSchedule").click(function() {
            // Grab the week text from the top of the screen
            let currentWeekText = $("#visualWeekDisplay").text();
            // Inject it into the modal
            $("#publishWeekTarget").text(currentWeekText);
            
            let myModal = new bootstrap.Modal(document.getElementById('publishConfirmModal'));
            myModal.show();
        });

        // 7. Confirm Publish
        $("#btnConfirmPublish").click(function() {
            $("#publishConfirmModal").modal('hide');
            let toastEl = document.getElementById('liveToast');
            let toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    }

    // --- D. MANPOWER PAGE LOGIC ---
    if ($('#manpowerFormCard').length > 0) {
        
        // 1. Keeps the slider text updating
        $("#optPreSales").on("input", function() {
            $("#sliderValue").text($(this).val() + "%");
        });

        // 2. The NEW, actual calculation logic
        $("#btnCalcManpower").click(function() {
            let btn = $(this);
            let originalText = btn.html();
            btn.html('<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Model...');
            btn.prop('disabled', true); 

            // Gather Data (Score Logic)
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

            // Distribute Roles
            let screening = 1;
            if (totalScore > 15) screening = 2; // Add a 2nd projectionist if huge shift

            let remainder = totalScore - screening;
            
            let snacks = Math.ceil(remainder * 0.5);   // 50%
            let cleaners = Math.floor(remainder * 0.3); // 30%
            
            // Cashiers get whatever is left, ensure at least 1 if remainder exists
            let cashiers = remainder - snacks - cleaners; 
            if (cashiers < 1 && remainder > 0) {
                cashiers = 1;
                if (snacks > 1) snacks--;
            }

            // Reveal Results
            setTimeout(() => {
                $("#manpowerFormCard").fadeOut(300, function() {
                    
                    // Inject calculated numbers
                    $("#resultStaffCount").text(totalScore);
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

        // 3. Keeps the reset button working
        $("#btnResetManpower").click(function() {
            $("#manpowerResults").fadeOut(300, function() {
                $("#manpowerFormCard").fadeIn(400);
            });
        });
    }

    // ==========================================
    // 4. HELPER FUNCTIONS
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
        // FIX: Now gets Monday instead of Tuesday
        let startDate = getMondayDate(weekVal); 

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

    // FIX: Renamed and removed the +1 day shift so it stays on Monday
    function getMondayDate(weekVal) {
        let date = new Date(); 
        if (weekVal) {
            let year = parseInt(weekVal.substring(0, 4));
            let week = parseInt(weekVal.substring(6));
            let simple = new Date(year, 0, 4); 
            let dayShift = (simple.getDay() || 7) - 1; 
            let isoMonday = new Date(year, 0, 4 - dayShift + (week - 1) * 7);
            date = new Date(isoMonday);
        }
        return date;
    }

    function autoFillSchedule(params) {
        // Categorize the Database
        const blockbusters = ["Avatar 2", "Dune 2", "Deadpool 3", "Spider-Man"];
        const family = ["Barbie", "Inside Out 2", "Spider-Man", "Avatar 2"];
        const adults = ["Oppenheimer", "Joker 2", "Gladiator 2", "The Batman 2", "Mission Impossible 8", "Top Gun 3"];
        
        // Base probability of a slot being filled
        let baseProb = params.gaps ? 0.85 : 0.50; // "Minimize Gaps" forces a dense schedule

        $(".drop-zone").each(function() {
            $(this).empty();
            let time = $(this).data("time"); // e.g., "11:00", "21:00"
            let dayIndex = $(this).data("day"); // 0 to 7 (Assuming 4 and 5 fall on Fri/Sat)
            
            let localProb = baseProb;
            let currentPool = [...MOVIE_DB]; // Default to all movies

            // Apply "Maximize Peak-Hour Occupancy"
            if (params.occupancy && (time === "18:30" || time === "21:00")) {
                localProb += 0.30;
            }

            // Apply "Ensure Full Weekend Coverage" (Boost probability to near 100% on weekends)
            if (params.weekend && (dayIndex === 4 || dayIndex === 5 || dayIndex === 6)) {
                localProb += 0.40;
            }

            // Apply "Optimize for Family" (Boost mornings, cut late nights, change movie pool)
            if (params.family) {
                if (time === "11:00" || time === "13:30") localProb += 0.30;
                if (time === "21:00" || time === "23:30") localProb -= 0.40;
                
                // If it's morning/afternoon, prioritize family movies
                if (time === "11:00" || time === "13:30" || time === "16:00") {
                    currentPool = family;
                }
            }

            // Apply "Prioritize Global Blockbusters" (Overwrite pool with blockbusters for peak times)
            if (params.blockbuster && !params.variety) {
                if (time === "18:30" || time === "21:00" || time === "23:30") {
                    currentPool = blockbusters;
                }
            }

            // Apply "Variety" (Force mixed pool)
            if (params.variety) {
                currentPool = [...MOVIE_DB];
            }

            // Final safety caps for probability
            if (localProb > 0.95) localProb = 0.95;
            if (localProb < 0.05) localProb = 0.05;

            // Roll the dice to place a movie
            if(Math.random() < localProb) { 
                let randomMovie = currentPool[Math.floor(Math.random() * currentPool.length)];
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

        if(input) {
            let today = new Date();
            let currentWeekStr = getISOWeekString(today);
            input.value = currentWeekStr;
            updateFromWeek(currentWeekStr);
            
            $(container).on("click", function() {
                try {
                    input.showPicker(); 
                } catch (err) {
                    input.focus();
                    input.click();
                }
            });

            $(input).on("change", function() {
                if(this.value) {
                    updateFromWeek(this.value);
                    buildScheduleGrid(); 
                }
            });
        }

        function updateFromWeek(weekVal) {
            let year = parseInt(weekVal.substring(0, 4));
            let week = parseInt(weekVal.substring(6));
            let simple = new Date(year, 0, 4); 
            let dayShift = (simple.getDay() || 7) - 1; 
            
            // FIX: Keep it exactly on the ISO Monday
            let isoMonday = new Date(year, 0, 4 - dayShift + (week - 1) * 7);
            let mondayStart = new Date(isoMonday);
            
            // End date is exactly 7 days later (Next Monday)
            let mondayEnd = new Date(mondayStart);
            mondayEnd.setDate(mondayStart.getDate() + 7);
            
            let startStr = mondayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            let endStr = mondayEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

    // ==========================================
    // 5. ROLE PERMISSIONS
    // ==========================================
    function applyRolePermissions() {
        let role = localStorage.getItem('userRole');
        
        // 1. Strip away Bootstrap's hidden class entirely so jQuery can take full control
        $('#moduleInventory, #moduleScheduling, #moduleManpower').removeClass('d-none');
        
        // 2. Force hide EVERYTHING first using strict jQuery
        $('#moduleInventory').hide();
        $('#moduleScheduling').hide();
        $('#moduleManpower').hide();
        
        // 3. Reveal exactly what they need based on your rules
        if (role === 'manager' || role === 'regional') {
            $('#moduleInventory').show();
            $('#moduleManpower').show();
        } 
        else if (role === 'procurement' || role === 'staff') {
            $('#moduleInventory').show();
        } 
        else if (role === 'content') {
            $('#moduleScheduling').show();
        }
    }

}); // END OF DOCUMENT READY
