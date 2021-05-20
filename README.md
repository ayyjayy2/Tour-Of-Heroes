# Tour-Of-Heroes
Following the Angular tutorial [https://angular.io/tutorial] for an intro Angular project that includes; dependency injection, service layer, multiple components, buttons, etc.


**Disclaimer: Some notes in the code may be identical to the notes on the Angular website**


Outline/Order of project:

I. Part 0: Creating the new project 
    A. ng new <proj_name>
    B. Data interpolation binding
II. Part 1: The hero Editor
    A. Create components
        1. ng g c <comp_name>
        2. adding selector to html to display component view
    B. Creating interface
    C. displaying object attributes to html 
    D. built-in pipes (uppercase)
    E. Editting hero using two-way data binding 
        1. [(ngModel)]="hero.name"
        2. needs FormsModule
    F. adding to AppModule
III. Part 2: Display a list
    A. creating mock heroes array in mock-heroes.ts file
    B. Displaying heroes 
        1. *ngFor
    C. Viewing details
        1. click event binding (click)="onSelect(hero)"
        2. *ngIf 
    D. CSS .selected class through class binding 
IV. Part 3: Create a Feature Component 
    A. moving details to its own component 
    B. @Input() for external component to bind data
V. Part 4: Add Service
    A. used to share info among classes that don't know each other. components
        shouldn't fetch/save data directly
    B. ng g s <service_name>
    C. @Injectable() decorator: marks participating with dependency injection system.
        it accepts metadata object for the service 
    D. get hero data from service and call that method in ngOnInit() lifecycle hook
    E. Dependency Injection (into constructor)
    F. Observable data with RxJS
        1. of()
        2. subscribe
    G. Show messages with messages component 
        1. display message from heroService and bind to messageService
VI. Part 5: Add Navigation with routing
    A. AppRoutingModule
        1. ng g m app-routing --flat --module=app 
            a. --flat puts the file in src/app instead of its own folder 
            b. --module=app tells CLI to register it in the improts array of the AppModule 
        2. const routes of type Routes to add path of each component view 
    B. RouterOutlet to display component views when they are called instead of displaying
        each separately statically 
    C. routerLink in html (non and with params)
    D. Add dashboard view (create dashboard component)
    E. navigate to hero details and pass parameter with parameterized route (hero id)
    F. extracting id route param 
        1. route.snapshot, paramMap
VII. Part 6: Get data from server 
    A. enable HTTP services with HttpClientModule 
    B. Simulate a data server 
        1. npm i angular-in-memry-web-api --save 
        2. importing HttpClientInMemoryWebApiModule and InMemoryDataService
    C. ng g s <service_name> to take over the mock heroes file 
    D. GET, PUT, POST, DELETE methods using HttpClient 
        1. get hero data
        2. update hero 
        3. create new hero 
        4. delete hero 
    E. Error Handling 
    F. tap()
    G. Search by name with search component 
        1. AsyncPipe (allows observable to be subscribed with *ngFor since *ngFor can't do it)
        2. RxJS Subject (searchTerms) and chaining RxJS operators 

