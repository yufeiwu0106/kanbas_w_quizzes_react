export default function FunctionDestructing() {
    const add = (a: number, b: number) => a + b;
    const sum = add(1, 2);
    const subtract = ({ a, b }: { a: number; b: number }) => a - b;
    const difference = subtract({ a: 4, b: 2 });

    return (
      <div id="wd-function-destructing">
        <h2>Function Destructing</h2>
        const add = (a, b) =&gt; a + b;<br />
        const sum = add(1, 2);<br />

        {/* subtract uses object destructing to declare constants a and b which unpacks the values 4 and 2 from the object argument with properties of the same name */}
        const subtract = (&#123; a, b &#125;) =&gt; a - b;<br />
        const difference = subtract(&#123; a: 4, b: 2 &#125;);<br/>
        sum = {sum}<br />
        difference = {difference} <hr />
      </div>
   );}
   