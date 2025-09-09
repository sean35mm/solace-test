# Points of Discussion

## What I would do next?

- Add validation with Zod on the API route
- Use Tanstack Table for the data table. I've integrated react-query and react-table (tanstack) at almost every company I've worked for. It's a powerful combination and I've used it to build a lot of complex tables with sorting, filtering, pagination, and more.
- I think we should consider virtualization for the table. If we have a lot of data, we can use virtualization to only render the visible rows and offload the rest to the browser.
- probably add some logging via 3rd party
- tests if neded

## Other considerations

- In my usage of react-query, I just did a simple hook implementation for the sake of the assignment, but in large codebases, I'd split the logic into a hook and a service layer. The service layer would handle the API calls and also take advantage of the AbortSignal
- I'm not really opinionated on the organization of the codebase, I just chose something that would be quick to maintain and understand for the purpose of the assignment
- This was my first time using drizzle. Pretty great!
- My wife is a designer and always makes fun of me for my terrible taste. I'm at the 2hr mark now but I think I'll add a few more touches to styling

- Looking back, I think I'd definitely make the input search be a multiselect component
