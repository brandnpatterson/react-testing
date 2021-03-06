import React from 'react';
import { mount } from 'enzyme';
import Store from '../../Store';
import CommentBox from '../CommentBox';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Store>
      <CommentBox />
    </Store>
  );
});

// unmount when running full DOM test with 'mount'
afterEach(() => {
  wrapped.unmount();
});

it('has a text area and a button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {
  beforeEach(() => {
    wrapped.find('textarea').simulate('change', {
      target: { value: 'new comment' }
    });
    wrapped.update();
  });

  it('has a text area that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when form is submitted, text area gets emptied', () => {
    wrapped.find('form').simulate('submit', { preventDefault() {} });
    wrapped.update();

    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});
