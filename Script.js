$(document).ready(function() {

    /****************************************************************************************
     * GLOBAL INITIALIZATION
     * Checks if a branch was previously selected and displays it in the top navigation bar.
     ****************************************************************************************/
    let activeBranch = localStorage.getItem('activeBranch');
    if(activeBranch) $('#navBranchDisplay').text(activeBranch);


    /****************************************************************************************
     * SECTION 1: DATA & CONFIGURATION
     * Contains all the static arrays and objects used to populate the mockup's UI.
     ****************************************************************************************/

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
        "🍫 Sweets & Snacks": [
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


    /****************************************************************************************
     * SECTION 2: GLOBAL ACTIONS
     * Behaviors that apply across the entire application, regardless of the active page.
     ****************************************************************************************/
    
    /* --------------------------------------------------------------------------
       [ Logout Action ] - Wipes memory and returns to the Landing Screen
        The e here means "Event"
       -------------------------------------------------------------------------- */
    $('body').on('click', '#btnLogout, .btn-logout', function(e) {
        e.preventDefault();
        
        localStorage.removeItem('activeBranch'); 
        localStorage.removeItem('userRole'); 
        
        $('#headerBranch').text("Select Branch");
        
        window.location.href = "LandingScreen.html"; 
    });


    /****************************************************************************************
     * SECTION 3: MODULE SPECIFIC LOGIC
     * Code blocks that only trigger if their specific HTML container exists on the page.
     ****************************************************************************************/

    /* ==========================================================================
       MODULE A: LANDING & LOGIN SCREEN
       ========================================================================== */
    if ($('#loginScreen').length > 0) {
        
        /* --------------------------------------------------------------------------
           [ Smart Navigation ] - Bypasses login if returning from an assignment module
           -------------------------------------------------------------------------- */
        const urlParams = new URLSearchParams(window.location.search);
        let savedBranch = localStorage.getItem('activeBranch');
        
        if (urlParams.has('return') && savedBranch) {
            $('#loginScreen').addClass('d-none');
            $('#appHeader').removeClass('d-none');
            $('#headerBranch').text(savedBranch);
            
            applyRolePermissions();
            
            $('#dashboardScreen').removeClass('d-none');
        }

        /* --------------------------------------------------------------------------
           [ Back Button Sequence ] - Handles sequential navigation backwards
           -------------------------------------------------------------------------- */
        $('#btnBack').click(function() {
            
            // -> From Dashboard to Branch Selection (Skips Branch for HQ roles)
            if (!$('#dashboardScreen').hasClass('d-none')) {
                $('#dashboardScreen').addClass('d-none');
                
                localStorage.removeItem('activeBranch');
                let role = localStorage.getItem('userRole');
                
                if (role === 'procurement' || role === 'content') {
                    $('#headerBranch').text("Select Branch");
                    $('#roleScreen').removeClass('d-none').hide().fadeIn(300);
                    return;
                }
                
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
            
            // -> From Branch Selection to Role Selection
            if (!$('#branchScreen').hasClass('d-none')) {
                $('#branchScreen').addClass('d-none');
                $('#roleScreen').removeClass('d-none').hide().fadeIn(300);
                return;
            }

            // -> From Role Selection to Login Screen (Clears inputs for security)
            if (!$('#roleScreen').hasClass('d-none')) {
                $('#roleScreen').addClass('d-none');
                $('#appHeader').addClass('d-none'); 
                
                $("#usernameInput").val("");
                $("#passwordInput").val("");
                
                $('#loginScreen').removeClass('d-none').hide().fadeIn(300);
                return;
            }
        });

        /* --------------------------------------------------------------------------
           [ Login Submit Action ] - Form Validation
            trim is used to chop off invisible spaces at the beginning and end of text.
           -------------------------------------------------------------------------- */
        $('#btnLoginSubmit').click(function() {
            let email = $("#usernameInput").val().trim();
            let pass = $("#passwordInput").val().trim();
            
            // Hide the error box every time they click, before checking again
            $("#loginError").addClass("d-none");

            // 1. Check if email is valid (must contain an '@')
            if (!email.includes("@")) {
                $("#loginError").removeClass("d-none").text("Please enter a valid email address containing '@'.");
                return; // Stops the code here so they don't log in
            }

            // 2. Check if password is at least 8 characters
            if (pass.length < 8) {
                $("#loginError").removeClass("d-none").text("Your password must be at least 8 characters long.");
                return; // Stops the code here so they don't log in
            }

            // 3. If it passes both checks above, let them in!
            $('#loginScreen').addClass('d-none');
            $('#appHeader').removeClass('d-none'); 
            $('#roleScreen').removeClass('d-none').hide().fadeIn(400);
        });

        /* --------------------------------------------------------------------------
           [ Role Selection Routing ] - Directs users based on HQ vs Branch roles
           -------------------------------------------------------------------------- */
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
                localStorage.setItem('activeBranch', "Holon Main Office");
                $('#headerBranch').text("Holon Main Office"); 
                
                applyRolePermissions();
                $('#dashboardScreen').removeClass('d-none').hide().fadeIn(400);
            }
        });

        /* --------------------------------------------------------------------------
           [ Branch Selection Action ] - Sets the location and opens Dashboard
           -------------------------------------------------------------------------- */
        $(document).on('click', '.branch-select-btn, .region-select-btn', function() {
            let locationName = $(this).data("loc");
            localStorage.setItem('activeBranch', locationName); 
            $('#headerBranch').text(locationName);
            
            $('#branchScreen').addClass('d-none');
            
            applyRolePermissions(); 
            
            $('#dashboardScreen').removeClass('d-none').hide().fadeIn(400);
        });
    }

    /* ==========================================================================
       MODULE B: INVENTORY COUNT PAGE
       ========================================================================== */
    if ($('#inventoryContainer').length > 0) {
        
        renderInventory(); 
        
        /* --------------------------------------------------------------------------
           [ Variance (Diff) Calculator ] - Live updates as users type stock counts
           -------------------------------------------------------------------------- */
        $(document).on("input", ".input-stock", function() {
            let inputVal = $(this).val();
            let norm = $(this).parent().prev().prev().find("span").text();
            let variance = parseInt(norm) - (parseInt(inputVal) || 0);
            let displayObj = $(this).parent().next().find(".variance-val");
            displayObj.text(variance > 0 ? "-" + variance : variance);
            if (variance > 0) displayObj.removeClass("text-success").addClass("text-danger");
            else displayObj.removeClass("text-danger").addClass("text-success");
        });

        /* --------------------------------------------------------------------------
           [ Sync Data Action ] - Triggers the success toast notification
           -------------------------------------------------------------------------- */
        $("#btnSync").click(function() {
            let toastEl = document.getElementById('liveToast');
            let toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    }

    /* ==========================================================================
       MODULE C: MOVIE SCHEDULING PAGE
       ========================================================================== */
    if ($('#scheduleWeekInput').length > 0) {
        let savedBranch = localStorage.getItem('activeBranch');
        if(savedBranch) $(".d-flex h4").text("Scheduling: " + savedBranch);
        initWeekPicker();

        /* --------------------------------------------------------------------------
           [ Alert UI Management ] - Hides the AI feedback safely without deleting it
           -------------------------------------------------------------------------- */
        $("#btnHideFeedback").click(function() {
            $("#aiFeedbackCard").addClass("d-none");
        });
        
        /* --------------------------------------------------------------------------
           [ UI Modes ] - Switching between AI Parameters and Manual Drag & Drop
           -------------------------------------------------------------------------- */
        $("#btnManualSchedule").click(function() {
            $("#scheduleModeSelection").addClass("d-none");
            $("#scheduleResults").removeClass("d-none");
            $(".picker-container").css({"pointer-events": "none", "opacity": "0.6"});
            initDragAndDrop();
        });

        $("#btnExitBuilder").click(function() {
            $("#scheduleResults").addClass("d-none");
            $("#scheduleModeSelection").removeClass("d-none");
            $(".picker-container").css({"pointer-events": "auto", "opacity": "1"});
            $("#aiFeedbackCard").addClass("d-none");
        });

        $("#btnAISchedule").click(function() {
            $("#scheduleModeSelection").addClass("d-none");
            $("#aiWizardContainer").removeClass("d-none");
            $(".picker-container").css({"pointer-events": "none", "opacity": "0.6"});
        });

        $("#btnCancelAI").click(function() {
            $("#aiWizardContainer").addClass("d-none");
            $("#scheduleModeSelection").removeClass("d-none");
            $(".picker-container").css({"pointer-events": "auto", "opacity": "1"});
        });

        /* --------------------------------------------------------------------------
           [ AI Generation Execution ] - Reads parameters and builds the schedule
           -------------------------------------------------------------------------- */
        $("#btnRunAI").click(function() {
            
            // -> Reads user configuration from UI checkboxes
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
            
            // -> Simulates processing delay before rendering results
            setTimeout(function() {
                $("#scheduleLoading").addClass("d-none");
                $("#scheduleResults").removeClass("d-none");
                initDragAndDrop();
                
                autoFillSchedule(aiParams);
                
                // -> Calculate dynamic efficiency score based on selected goals
                let efficiency = 75 + Math.floor(Math.random() * 5); 
                let appliedCount = 0;
                let msgs = [];

                if (aiParams.blockbuster) { efficiency += 4; appliedCount++; msgs.push("Blockbusters"); }
                if (aiParams.occupancy)   { efficiency += 4; appliedCount++; msgs.push("Peak-Hours"); }
                if (aiParams.family)      { efficiency += 3; appliedCount++; msgs.push("Family Slots"); }
                if (aiParams.gaps)        { efficiency += 4; appliedCount++; msgs.push("Tight Turnovers"); }
                if (aiParams.weekend)     { efficiency += 5; appliedCount++; msgs.push("Weekends"); }
                if (aiParams.variety)     { efficiency += 2; appliedCount++; msgs.push("Variety"); }

                if (efficiency > 99) efficiency = 99;

                let summaryText = appliedCount > 0 
                    ? `Optimized for: ${msgs.join(", ")}.` 
                    : "Standard Balanced Schedule applied.";

                $("#aiFeedbackCard").removeClass("d-none");
                $("#aiFeedbackText").html(`${summaryText} Efficiency: <span class='text-teal fw-bold'>${efficiency}/100</span>`);
            }, 2000);
        });

        /* --------------------------------------------------------------------------
           [ Publish Workflow ] - Modal and Toast triggers for finalizing schedules
           -------------------------------------------------------------------------- */
        $("#btnPublishSchedule").click(function() {
            let currentWeekText = $("#visualWeekDisplay").text();
            $("#publishWeekTarget").text(currentWeekText);
            
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

    /* ==========================================================================
       MODULE D: MANPOWER OPTIMIZATION PAGE
       ========================================================================== */
    if ($('#manpowerFormCard').length > 0) {
        
        /* --------------------------------------------------------------------------
           [ Live UI Binding ] - Updates the percentage label for pre-sales
           -------------------------------------------------------------------------- */
        $("#optPreSales").on("input", function() {
            $("#sliderValue").text($(this).val() + "%");
        });

        /* --------------------------------------------------------------------------
           [ Calculation Engine ] - Weights inputs to determine staffing requirements
           -------------------------------------------------------------------------- */
        $("#btnCalcManpower").click(function() {
            let btn = $(this);
            let originalText = btn.html();
            btn.html('<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Model...');
            btn.prop('disabled', true); 

            let totalScore = 3; 
            
            let day = $("#optDayType").val();
            let shift = $("#optShift").val();
            let weather = $("#optWeather").val();
            let event = $("#optEvents").val();
            let isHoliday = $("#optHoliday").is(":checked");
            let isPremiere = $("#optPremiere").is(":checked");
            let preSales = parseInt($("#optPreSales").val());

            // -> Mathematical weights based on environmental factors
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

            // -> Distribute staff count across specific job roles
            let screening = 1;
            if (totalScore > 15) screening = 2; 

            let remainder = totalScore - screening;
            
            let snacks = Math.ceil(remainder * 0.5);   
            let cleaners = Math.floor(remainder * 0.3); 
            
            let cashiers = remainder - snacks - cleaners; 
            if (cashiers < 1 && remainder > 0) {
                cashiers = 1;
                if (snacks > 1) snacks--;
            }

            // -> Transition UI to display results
            setTimeout(() => {
                $("#manpowerFormCard").fadeOut(300, function() {
                    
                    $("#resultStaffCount").text(totalScore);
                    $("#resSnacks").text(snacks);
                    $("#resCleaners").text(cleaners);
                    $("#resCashiers").text(cashiers);
                    $("#resScreening").text(screening);

                    $("#manpowerResults").removeClass("d-none").hide().fadeIn(400);
                    
                    btn.html(originalText);
                    btn.prop('disabled', false);
                });
            }, 1000);
        });

        /* --------------------------------------------------------------------------
           [ Reset UI ] - Clears results and returns to the parameter form
           -------------------------------------------------------------------------- */
        $("#btnResetManpower").click(function() {
            $("#manpowerResults").fadeOut(300, function() {
                $("#manpowerFormCard").fadeIn(400);
            });
        });
    }

    /****************************************************************************************
     * SECTION 4: HELPER FUNCTIONS
     * Reusable logic responsible for generating HTML structures and calculations.
     ****************************************************************************************/

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
        const blockbusters = ["Avatar 2", "Dune 2", "Deadpool 3", "Spider-Man"];
        const family = ["Barbie", "Inside Out 2", "Spider-Man", "Avatar 2"];
        const adults = ["Oppenheimer", "Joker 2", "Gladiator 2", "The Batman 2", "Mission Impossible 8", "Top Gun 3"];
        
        let baseProb = params.gaps ? 0.85 : 0.50; 

        $(".drop-zone").each(function() {
            $(this).empty();
            let time = $(this).data("time"); 
            let dayIndex = $(this).data("day"); 
            
            let localProb = baseProb;
            let currentPool = [...MOVIE_DB]; 

            if (params.occupancy && (time === "18:30" || time === "21:00")) {
                localProb += 0.30;
            }

            if (params.weekend && (dayIndex === 4 || dayIndex === 5 || dayIndex === 6)) {
                localProb += 0.40;
            }

            if (params.family) {
                if (time === "11:00" || time === "13:30") localProb += 0.30;
                if (time === "21:00" || time === "23:30") localProb -= 0.40;
                
                if (time === "11:00" || time === "13:30" || time === "16:00") {
                    currentPool = family;
                }
            }

            if (params.blockbuster && !params.variety) {
                if (time === "18:30" || time === "21:00" || time === "23:30") {
                    currentPool = blockbusters;
                }
            }

            if (params.variety) {
                currentPool = [...MOVIE_DB];
            }

            if (localProb > 0.95) localProb = 0.95;
            if (localProb < 0.05) localProb = 0.05;

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
            
            let isoMonday = new Date(year, 0, 4 - dayShift + (week - 1) * 7);
            let mondayStart = new Date(isoMonday);
            
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

    /****************************************************************************************
     * SECTION 5: ROLE PERMISSIONS
     * Manages module visibility on the Dashboard based on the user's specific job role.
     ****************************************************************************************/
    function applyRolePermissions() {
        let role = localStorage.getItem('userRole');
        
        $('#moduleInventory, #moduleScheduling, #moduleManpower').removeClass('d-none');
        
        $('#moduleInventory').hide();
        $('#moduleScheduling').hide();
        $('#moduleManpower').hide();
        
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

}); // END OF DOCUMENT 