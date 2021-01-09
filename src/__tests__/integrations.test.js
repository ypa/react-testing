import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
  // Intercept all axios requrests
  moxios.install();
  // Stub out all the requests
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetch #1' }, { name: 'Fetch #2' }]
  });
});

afterEach(() => {
  moxios.uninstall();
});


it('can fetch a list of comments and display them', (done) => {
  // Attempt to render the *entire* app
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  // find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click');

  // Need to wait a little 100ms before we can verify
  setTimeout(() => {
    wrapped.update();

    // Expect to find a list of comments!
    expect(wrapped.find('li').length).toEqual(2);

    done();
    wrapped.unmount();
  }, 100);
});


