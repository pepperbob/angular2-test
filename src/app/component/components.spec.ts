import {
  it,
  inject,
  injectAsync,
  describe,
  fdescribe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


import {ComponentTwo, SomeName} from './components';

fdescribe('component two', () => {

	it('should should do stuff', injectAsync([TestComponentBuilder], (tcb) => {
	    return tcb.createAsync(ComponentTwo).then((fixture: any) => {
			let theInput: SomeName = new SomeName({value: 'unome'});
			fixture.componentInstance.theInput = theInput;
			fixture.detectChanges();

	        let compiled = fixture.debugElement.childNodes[0].childNodes[2];
			console.log(compiled.nativeNode.innerHTML);
	        expect(compiled.nativeNode.innerHTML).toMatch(theInput.value);
	      });
	  }));
});
