Demo overview:

quick pass at this assignment- I tried to stick to the two hour mark as best I could, so there are some things that are incomplete.

Some things that I worked on that I broke out into 3 merge requests:

- frontend first pass:
  Advocate page:

- restructured how the Advocates page was set up. instead of one giant component, split the advocates table out into an <AdvocateRow /> component. If I continued on, I would better segment this view out into a <SearchBar /> to handle the searching items, and then an <AdvocatesTable /> to handle the list of advocates.

- deleted some redundant search bar code.
- reworked state management in the component
- removed bad jsx/tsx code (selecting DOM elements directly is against convention)
- added the search by column checkboxes (with a few checked by default). This felt a little cleaner and lets the user search more presicely if they choose.
- created an advocate and specialty interface for typing.

Merge request 2: Styling

- added some basic styling to the advocates page. I used tailwind.

this section is the one I popped into claude to get some help with. I'm not a CSS genius, and I've found that using an AI tool can get much better results that I tweak a bit to get to a place that I'm happy with.

Merge Request 3: Database:

- As previously mentioned, I didn't love the shape of the data on the advocates page, particularly how specialties were handled. If this was a production app, we'd probably have more information on specialties, so I mocked that up a bit with the Advocates table, a specialties table, and an advocate_specialties table to bridge the one-to-many relationship between advocates and specialties.
- fixed the database setup, something was off about it (the select method was getting overwritten?)

I've never used Drizzle ORM before, but I've used SQLalchemy a decent amount so when I got the typing error when trying to select from the database, I knew something was up.

If I were to continue working I'd do the following more "big picture" items:

- Unit tests. I'm a big beliver in getting some tests written out for th
- set up some type of authentication for frontend users (probably JWT bearer token) and add that into the fetch API. some light googling tells me that the convention is to stick with fetch in Next.js. I'd create a class that would wrap the fetch client and add the specific user authorization headers into each request so that I can verify user identity when requests are made.

- add pagination to the advocates table
- offload the search onto the backend of the app? i did some reading on the "use client" and "use server" portions of next,

-segment out the database design better
-smooth out the expansion animation on the advocate table

- make the search work a bit better on the page- for example, searching first name AND last name at the same time, not just one or the other ("john" returns john doe, "doe" returns john doe, but "john doe" returns nothing currently).
- mobile responisve styling (the table is not mobile friendly).

- sort by column on the advocatestable
- build out other core app features (globalized state, authentication, etc)
- create a class to interact with the Advocates database table. this would include some methods like getAdvocates(), getAdvocateById(), createAdvocate(), updateAdvocate(), deleteAdvocate().

- Honestly, i think the best thing to do (long term) would to be to create a table builder class that could take in any number of columns and build a table based around that- this pattern is super common- get a list of data, then render a list of rows based on that data. it would be used throughout the entire app, so something like <AppTable columns={columns} data={data}  /> could work pretty well, maintain consistency throughout the app, or could be extended to handle specific use cases/compexities.

There's a lot more to talk about but just wanted to give a general overview of how I approached the assignment. Would love to chat more about it and get some feedback!
