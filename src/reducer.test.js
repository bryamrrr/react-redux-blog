import reducer from'./reducer';
import actions from'./actions';

test('reducer - SET_COMMENTS', () => {
  expect(
    reducer(
      undefined,
      actions.setComments([{ id: 1 }, { id: 3 }])
    )
  ).toMatchSnapshot();
});