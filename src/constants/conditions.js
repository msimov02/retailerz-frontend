import * as ROUTES from './routes';

export const USER_NOT_NULL = {
    condition: authUser => !!authUser,
    redirect: ROUTES.SIGN_IN
}
export const USER_NULL = {
    condition: authUser => authUser == null,
    redirect: ROUTES.HOME
}
export const USER_HAS_DATA = {
    condition: authUser => authUser.data !== undefined,
    redirect: ROUTES.USER_INFO
};
export const USER_DATA_UNDEFINED = {
    condition: authUser => authUser.data === undefined,
    redirect: ROUTES.HOME
}