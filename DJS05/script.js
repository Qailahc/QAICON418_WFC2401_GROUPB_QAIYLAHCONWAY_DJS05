// The Store class manages state and provides methods to get the current state, 
// dispatch actions to update the state, and subscribe to state changes
class Store {
    constructor(reducer, initialState) {
      this.reducer = reducer;     // function provided to the Store that will handle state transitions based on actions
      this.state = initialState;  // the starting state of the store
      this.listeners = [];        // this.listeners: An array to hold functions that will be called when the state changes
    }
    
    // Returns the current state of the store
    getState() {
        return this.state;
      }
   // Takes an action object as an argument
    dispatch(action) {
        // Calls the reducer function with the current state and the action, which returns a new state
      this.state = this.reducer(this.state, action);
      // Updates this.state with the new state returned by the reducer
      this.listeners.forEach((listener) => listener(this.state));
    }

    // Takes a listener function as an argument and adds it to the listeners array
    subscribe(listener) {
        this.listeners.push(listener);
        // Returns an unsubscribe function that, when called, removes the specified listener from the listeners array. This prevents the listener from being called on future state changes
        return () => {
          this.listeners = this.listeners.filter((l) => l !== listener);
        };
      }
    }


  // tallyReducer function is a pure function that defines how the state changes in response to different actions
  const reduceTally = (state = 0, action) => {
    switch (action.type) {
      case "ADD":
        return state + 1;
        case "SUBTRACT":
            return state - 1;
            case "RESET":
                return 0;
              default:
                return state;
            }
          };

   // Create the Store 
   // Creates a new Store instance with the reduceTally as the reducer and 0 as the initial state
   const store = new Store(reduceTally, 0);

   // Subscribe to Changes - // You can subscribe to state changes with a listener function and unsubscribe from state changes to stop receiving updates

   // Subscribes to state changes by providing a listener function that logs the new state to the console whenever the state is updated
   const unsubscribe = store.subscribe((newState) => {
    console.log("State updated:", newState);
  });


  // Test Scenarios

  // Scenario 1 - Logs the initial state of the store, which should be 0
  console.log("Initial state:", store.getState()); 

  // Actions are dispatched to the store to change the state, and these changes trigger all subscribed listeners

  // Scenario 2 - Dispatches two "ADD" actions. Each action increments the state by 1, so the state becomes 2
  store.dispatch({ type: "ADD" });
  store.dispatch({ type: "ADD" });

  // Scenario 3 - Dispatches a "SUBTRACT" action. This decrements the state by 1, so the state becomes 1
  store.dispatch({ type: "SUBTRACT" });
  
  // Scenario 4 - Dispatches a "RESET" action. This resets the state to 0
  store.dispatch({ type: "RESET" });
  

   // Unsubscribe - Calls the unsubscribe function to remove the listener, so it will no longer log state updates to the console
   unsubscribe();


// Overview of the Approach
// The code defines a simple state management system using the principles of Redux. Here is a step-by-step explanation of the approach:

// 1. Store Class:
//  - Manages the application's state.
//  - Provides methods `getState()`, `dispatch(action)`, and `subscribe(listener)`.

// 2. tallyReducer Function:
//  - A pure function that determines how the state changes in response to different actions (`ADD`, `SUBTRACT`, `RESET`).

// 3. Creating the Store:
//   - An instance of the `Store` class is created with the `reduceTally` and an initial state of `0`.

// 4. Subscribing to State Changes:
//   - A listener is subscribed to log state updates to the console.

// 5. Dispatching Actions:
//  - Different actions are dispatched to the store, triggering state changes and logging the new state to the console.

// 6. Unsubscribing:
//   - The listener is unsubscribed to stop receiving state updates.

// This approach allows for managing the state of an application in a predictable way, ensuring that the state transitions are handled through a centralized mechanism (the reducer) and that components (listeners) are updated accordingly.
