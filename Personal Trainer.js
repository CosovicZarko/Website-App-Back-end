// Each of the following classes can be easily moved to its own file.
// Initial display will have the following options: 	SIGN-IN    	CREATE NEW PROFILE

class PT {

// SIGN-IN option may display a list of clickable PT names and/or provide a search bar. 
// Clicking on a Physical Therapists's name creates a temporary PT object with PT's information from the DB.
// CREATE NEW PROFILE will listen for user input, and create a new PT table in the database using user input. 

	constructor(name, id, patients) {
		this.name = name							// Physical trainer's name.
		this.id = id								// Physical trainer's ID.
		this.patients = [patients]					// String array of PT's patients names.
	}
	getName(){										// May be used to display PT's name.
		return(this.name)
	}
	getId(){										// Returns PT's ID. 									
		return(this.id)
	}
	getPatients() { 								// Returns a list of patient names. 		
		return(this.patients)				
	}
// Once signed in, the following options are displayed: 		PLANS	 	PATIENTS

// When PATIENTS is clicked, the list of clickable patient names is displayed. 
	showPatients(){							// Displays patients names.
		console.log(this.getPatients())
	}
	addPatient(userInput){					// At the end of the patients list, we may have " + add new patient".
		this.patients.push(userInput)		// This function is one of the last things to worry about.
	}
// More about patients at the end.	
}
// When PLANS is clicked, the following options are displayed: 		FIND A PLAN			CREATE NEW PLAN



class Plan {

// FIND A PLAN option may display a list of clickable plan names from the library in the DB, and/or provide a search bar. 
// Clicking on a plan from that list creates a temporary Plan object with information from the DB.
	constructor(name, exercise, video) {  
		this.name = name			// These variables carry the names of fields in the Plan table, in the DB,
		this.video = video			// and we will use the information from the table
		this.exercise = [exercise]	// and assign it to these variables when creating an instance. 
	}	
	getPlanName(){			
		return(this.name)
	}	
	getVideo(){			
		return(this.video)
	}	
	getExercise(){			
		return(this.exercise)
	}	
// When CREATE NEW PLAN is clicked, a temporary Plan object with no paramters is created, 
// and the following options are displayed: 	PLAN NAME      UPLOAD A VIDEO	 ADD EXERCISES  	SAVE PLAN

// PLAN NAME and UPLOAD A VIDEO display a box to take user input.
	setPlanName(userInput){			
		this.name = userInput
	}
	uploadVideo(userInput){ 
		this.video = userInput
	}
// ADD EXERCISES option may display a list of clickable exercise names. (we can do drag and drop later)
// We can have an "ADD" button to be used after clicking on the exercise we want to add to the plan.
	setExercise(userInput){				// This method is created to avoid 'undefined' elements.
		this.exercise = [userInput]		// It only needs to be used with the first exercise we add.
	}
	addExercise(userInput){				// Adds exercises to the plan, one at a time.
		this.exercise.push(userInput)	// exercise is a string array of exercise names. 
	}
// Clicking on SAVE PLAN will use the temporary Plan object to add a new plan to the library of plans in the DB.
}



// Selecting PATIENTS instead of PLANS will display clickable patient names. 
// Clicking on a patient's name creates a temporary Patient object(described next), which we then use to make changes locally, 
// minimizing the number of times we are accessing DB, which should save time. At this point we should start the session timer.
class Patient{
	constructor(name, plan, feedback, time, history){
		this.name = name			
		this.plan = plan					// These variables carry the names of fields in the patients table, in the DB,
		this.feedback = feedback			// and we will use the information from the table
		this.time = time					// and assign it to these variables when creating an instance. 
		this.history = [history]
	}
// Then, the following options are displayed: 	 SHOW PLAN 	  SET PLAN	   GIVE FEEDBACK 	GET TIME    	GET HISTORY   END SESSION

	getPatientName(){				// May be used to display patient's name
		return(this.name)
	}	
	
	// Selecting SHOW PLAN calls showPlan() which just prints the returned value to the screen.
	showPlan(){						// Displays current plan.
		console.log(this.plan)								
	}
	
	// Selecting SET PLAN will display clickable plan names from library in DB. 
	// We can have an "ADD" button to be used after clicking on the plan we want to set.
	setPlan(userInput){				// Assigns a chosen plan.
		this.plan = userInput
	}	
	
	// Selecting GIVE FEEDBACK will display a comment box. 
	// We can have a "SEND" button to be used when we want to add feedback.	
	addFeedback(userInput){			// Adds feedback
		this.feedback = userInput
	}
	
	// Selecting GET TIME will just print total time spent with patient. 
	getTime(){						// Returns time, which is the total time PT spent on that patient.
		console.log(this.time)
	}								

	// Selecting GET HISTORY will display a clickable list of previous patient tables created in the library. 
	getHistory(){
		return(this.history)		// Returns history of interactions with the patient.
	}
	// Selecting a table from that list will display all the information from that table. 
	
	// Selecting END SESSION will update the time and history, and return us to the main menu(PLANS PATIENTS). 
	setTime(elapsed_time){			// Add the time spent on a patient to patients time.
		this.time = this.time + elapsed_time
	}	
	setHistory(current_session){	// Update history, adding the latest patient table to the library.
		this.history.push(current_session)
	}							
}

// The class which listens to user input will create objects of these classes, and access their methods.

// EXAMPLES:

var pt_temp = new PT("John", "45", "patient 123") 						
console.log(pt_temp)	
console.log("Adding patient 1000")
pt_temp.addPatient("patient 1000")	
pt_temp.showPatients()						

var plan_temp = new Plan
plan_temp.setPlanName("Starting Plan") 
plan_temp.uploadVideo("Video url")				
plan_temp.setExercise("3 daily barbell wrist curl")	
plan_temp.addExercise("3 daily reverse curl") 

var patient_temp = new Patient("Nancy", "No plan", "No feedback", 1, "No history") 						
patient_temp.setPlan(plan_temp)
patient_temp.addFeedback("Great job!")	
patient_temp.setTime(5)						
console.log(patient_temp)	