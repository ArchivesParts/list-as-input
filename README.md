# list-as-input
Angular directive which allow user to add multiple values in a single input


## HTML Usage

Example with default pattern (ie:email matching)

```html
 <input list-input
         ng-model="emails"
         name="emails"
         label="Email list"
         end-key=","
         type="text"
         placeholder="Email">
```


Example with custom pattern

```html
  <input list-input
         ng-model="counter"
         pattern="^\w+$"
         label="Counter lists"
         end-key=";"
         type="text"
         placeholder="Size"
         name="counter">
```
  
## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

