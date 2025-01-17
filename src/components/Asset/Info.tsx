import type {
	AssetHistoryDatum,
	AssetInfo,
	AssetWithTwin,
	Battery,
	Environment,
	GNSS,
	Roaming,
	UnixTimeInSeconds,
} from 'asset/asset'
import { expectedSendIntervalInSeconds } from 'asset/expectedSendIntervalInSeconds'
import { ConnectionInformation } from 'components/Asset/ConnectionInformation'
import styles from 'components/Asset/Info.module.css'
import {
	AltitudeIcon,
	BatteryIcon,
	CloudIcon,
	CloudRainIcon,
	IconWithText,
	SpeedIcon,
	ThermometerIcon,
} from 'components/FeatherIcon'
import { ReportedTime } from 'components/ReportedTime'
import { Toggle } from 'components/Toggle'

const RoamInfo = ({
	roam,
	dev,
	expectedSendIntervalInSeconds,
	receivedAtSeconds,
}: {
	expectedSendIntervalInSeconds: number
	roam?: AssetHistoryDatum<Roaming>
	dev?: AssetHistoryDatum<AssetInfo>
	receivedAtSeconds?: UnixTimeInSeconds
}) => {
	if (roam === undefined) return null
	return (
		<Toggle className={styles.assetInfoToggle}>
			<div className={styles.info} data-test="connection-info">
				<ConnectionInformation
					mccmnc={roam.v.mccmnc}
					rsrp={roam.v.rsrp}
					reportedAtSeconds={roam.ts / 1000}
					receivedAtSeconds={receivedAtSeconds}
					networkMode={roam?.v.nw}
					iccid={dev?.v.iccid}
					dataStaleAfterSeconds={expectedSendIntervalInSeconds}
				/>
			</div>
		</Toggle>
	)
}

const BatteryInfo = ({
	bat,
	expectedSendIntervalInSeconds,
	receivedAtSeconds,
}: {
	bat?: AssetHistoryDatum<Battery>
	expectedSendIntervalInSeconds: number
	receivedAtSeconds?: UnixTimeInSeconds
}) => {
	if (bat === undefined) return null

	return (
		<Toggle className={styles.assetInfoToggle}>
			<div className={styles.info} data-test="battery-info">
				<IconWithText>
					<BatteryIcon />
					{bat.v / 1000} V
				</IconWithText>
				<ReportedTime
					reportedAtSeconds={bat.ts / 1000}
					receivedAtSeconds={receivedAtSeconds}
					staleAfterSeconds={expectedSendIntervalInSeconds}
				/>
			</div>
		</Toggle>
	)
}

const GNSSInfo = ({
	gnss,
	expectedSendIntervalInSeconds,
	receivedAtSeconds,
}: {
	gnss?: AssetHistoryDatum<GNSS>
	expectedSendIntervalInSeconds: number
	receivedAtSeconds?: UnixTimeInSeconds
}) => {
	if (gnss?.v?.spd === undefined && gnss?.v?.alt === undefined) return null
	return (
		<Toggle className={styles.assetInfoToggle}>
			<div className={styles.info} data-test="gnss-info">
				<span>
					{gnss.v.spd !== undefined && (
						<IconWithText>
							<SpeedIcon />
							{Math.round(gnss.v.spd)} m/s
						</IconWithText>
					)}
					{gnss.v.alt !== undefined && (
						<IconWithText>
							<AltitudeIcon />
							{Math.round(gnss.v.alt)} m
						</IconWithText>
					)}
				</span>
				<ReportedTime
					reportedAtSeconds={gnss.ts / 1000}
					receivedAtSeconds={receivedAtSeconds}
					staleAfterSeconds={expectedSendIntervalInSeconds}
				/>
			</div>
		</Toggle>
	)
}

const EnvInfo = ({
	env,
	expectedSendIntervalInSeconds,
	receivedAtSeconds,
}: {
	env?: AssetHistoryDatum<Environment>
	expectedSendIntervalInSeconds: number
	receivedAtSeconds?: UnixTimeInSeconds
}) => {
	if (env === undefined) return null

	return (
		<Toggle className={styles.assetInfoToggle}>
			<div className={styles.info} data-test="environment-info">
				<span>
					{env.v.temp && (
						<IconWithText>
							<ThermometerIcon />
							{env.v.temp}°C
						</IconWithText>
					)}
					{env.v.hum && (
						<IconWithText>
							<CloudRainIcon />
							{Math.round(env.v.hum)}%
						</IconWithText>
					)}
					{env.v.atmp && (
						<IconWithText>
							<CloudIcon />
							{Math.round(env.v.atmp * 10)} hPa
						</IconWithText>
					)}
				</span>
				<ReportedTime
					reportedAtSeconds={env.ts / 1000}
					receivedAtSeconds={receivedAtSeconds}
					staleAfterSeconds={expectedSendIntervalInSeconds}
				/>
			</div>
		</Toggle>
	)
}

export const InfoHeader = ({ twin }: AssetWithTwin) => {
	const { bat, env, roam, gnss, dev } = twin.reported
	const expectedInterval = expectedSendIntervalInSeconds(twin)

	const receivedAtSeconds: Record<string, UnixTimeInSeconds | undefined> = {
		bat: twin.metadata?.reported?.bat?.ts?.timestamp,
		env: twin.metadata?.reported?.env?.ts?.timestamp,
		roam: twin.metadata?.reported?.roam?.ts?.timestamp,
		gnss: twin.metadata?.reported?.gnss?.ts?.timestamp,
		dev: twin.metadata?.reported?.dev?.ts?.timestamp,
	} as const

	return (
		<>
			<RoamInfo
				roam={roam}
				expectedSendIntervalInSeconds={expectedInterval}
				dev={dev}
				receivedAtSeconds={receivedAtSeconds.roam ?? receivedAtSeconds.dev}
			/>
			<GNSSInfo
				gnss={gnss}
				expectedSendIntervalInSeconds={expectedInterval}
				receivedAtSeconds={receivedAtSeconds.gnss}
			/>
			<BatteryInfo
				bat={bat}
				expectedSendIntervalInSeconds={expectedInterval}
				receivedAtSeconds={receivedAtSeconds.bat}
			/>
			<EnvInfo
				env={env}
				expectedSendIntervalInSeconds={expectedInterval}
				receivedAtSeconds={receivedAtSeconds.env}
			/>
		</>
	)
}
