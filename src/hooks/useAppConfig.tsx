import Amplify from 'aws-amplify'
import { createContext, useContext } from 'react'
import { fromEnv } from 'util/fromEnv'

const {
	identityPoolId,
	region,
	userPoolId,
	userPoolWebClientId,
	version,
	homepage,
	shortName,
	name,
	themeColor,
	backgroundColor,
} = fromEnv({
	identityPoolId: 'PUBLIC_IDENTITY_POOL_ID',
	region: 'PUBLIC_REGION',
	userPoolId: 'PUBLIC_USER_POOL_ID',
	userPoolWebClientId: 'PUBLIC_USER_POOL_CLIENT_ID',
	version: 'PUBLIC_VERSION',
	homepage: 'PUBLIC_HOMEPAGE',
	shortName: 'PUBLIC_MANIFEST_SHORT_NAME',
	name: 'PUBLIC_MANIFEST_NAME',
	themeColor: 'PUBLIC_MANIFEST_THEME_COLOR',
	backgroundColor: 'PUBLIC_MANIFEST_BACKGROUND_COLOR',
})(import.meta.env)

Amplify.configure({
	Auth: {
		identityPoolId,
		region,
		userPoolId,
		userPoolWebClientId,
		mandatorySignIn: true,
	},
})

export const AppConfigContext = createContext<{
	identityPoolId: string
	region: string
	userPoolId: string
	userPoolWebClientId: string
	basename: string
	version: string
	homepage: string
	manifest: {
		shortName: string
		name: string
		themeColor: string
		backgroundColor: string
	}
}>({
	identityPoolId,
	region,
	userPoolId,
	userPoolWebClientId,
	basename: import.meta.env.BASE_URL ?? '/',
	version,
	homepage,
	manifest: {
		shortName,
		name,
		themeColor,
		backgroundColor,
	},
})

export const useAppConfig = () => useContext(AppConfigContext)