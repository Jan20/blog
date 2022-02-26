# Testing Angular Apps
Angular provides a set of tools that can be used to test individual functions,components as well as end-to-end flow. This guide dives into common testing use-cases and tries to highlight best practices.

## Running Test Cases
The Angular CLI allows to run all tests defined in the project to be executed one after another by be running `ng test`. However, it is also possible to run only those tests that are defined in a specific file, as shown below:
```
test --include='**/blog.component.spec.ts'
```
If only one describe block or a single test should be executed, it is also an option to place the `f` character in front of the usual `describe` or `it` statements, resulting in `fdescribe` and `fit`.

## Getting Started

```js
if('should be created', () => {
	fixture.detectChanges();
	expect(component).toBeTruthy();
});
```