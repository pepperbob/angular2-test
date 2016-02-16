import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
selector: 'k1',
template: `<div>
	<h1>K1 Here</h1>
	<input [value]="theValue.value" (input)="propagate($event)"/>
</div>`
})
class ComponentOne {
	@Input() theValue: SomeName;
	@Output() typedSomething: EventEmitter<string> = new EventEmitter<string>();

	propagate(event) {
		this.typedSomething.next(event.target.value);
	}
}

@Component({
	selector: 'k2',
	inputs: ['theInput'],
	template: `<div><h1>K2 here</h1>
		<p>Value is: {{theInput.key}} / {{theInput.value}}</p>
		<p>Hash is: {{calculateHash()}}</p>`
})
export class ComponentTwo {
	theInput: SomeName;
	count: number = 0;

	calculateHash(): string {
		return this.theInput && this.theInput.value ? 
			`${this.theInput.value.length}xx (Count: ${this.count})` : '0';
	}
}

@Component({
	selector: 'kRoot',
	directives: [ComponentOne, ComponentTwo],
	template: `kRoots myName.value is: {{myName.value}}
	<k1 [theValue]="myName" (typedSomething)="updateValue($event)"></k1>
	<k2 [theInput]="myName"></k2>`
})
export class ComponentRoot {
	myName: SomeName;

	updateValue(value: string) {
		if(value === 'makenew') {
			this.myName = new SomeName({key: 'newly made', value: 'newly made value'});
		} else {
			this.myName.value = value;
		}
	}

	ngOnInit() {
		this.myName = new SomeName({key: 'the newly key :D :D', value: 'who cares anyways'});
	}
}

export class SomeName {
	key: string = 'the key';
	value: string;

	constructor(obj? : any) {
		this.key = obj && obj.key || 'empty key';
		this.value = obj && obj.value || 'empty value';
	}
}
