import { get, every, some, omit } from 'lodash';
import * as perm_funcs from "helpers/permissions";

export const apply_permissions = (values, permissions = [], key, props) => {
	const permissionSettings = get(permissions, key, { show: true });
	const operation = get(permissionSettings, 'operation', 'every') === 'some' ? some : every;
	return operation(
		omit(permissionSettings, 'operation'),
		(params, key) => (
			get(perm_funcs, key, () => (true))(values, params, props)
		)
	)
}


export const apply_field_permission = (values, field) => {
	return every( 
		get(field, 'permission', {show: true}), (value, key) =>
		get(perm_funcs, key, ()=> (true))(values, value)
	)
}