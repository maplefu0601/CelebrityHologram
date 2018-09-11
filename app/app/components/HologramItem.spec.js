import { describe, it, beforeEach } from 'mocha';
import Enzyme, { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import Item from './HologramItem';

describe('App Component', () => {
  let wrapper;
  let name='test';
  let imageData = '';
  let onDelete = function() {};
  beforeEach(function () {

    wrapper = mount(<Item name={name} imageData={imageData} onDelete={onDelete}/>);
  });
  it('renders li', () => {
    expect(wrapper.find('li').exists()).to.be.true;
    expect(wrapper.props().name).to.equal('test');
  });
  it('should render two spans', () => {
    expect(wrapper.find('span').hostNodes()).to.have.lengthOf(2);
  });
  it('verify delete click', () => {
    const handleClick = sinon.spy(wrapper.instance(), 'onDelete');
    wrapper.find('span').hostNodes().at(1).simulate('click');
    expect(handleClick).toHaveBeenCalled();
    //expect(handleClick.called).to.equal(true);
  });

});
