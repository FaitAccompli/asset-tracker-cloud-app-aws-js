import {
	HelpIcon,
	IconWithText,
	InfoIcon,
	LogoutIcon,
	MapIcon,
	ParcelIcon,
} from 'components/FeatherIcon'
import { useAppConfig } from 'hooks/useAppConfig'
import { useAuth } from 'hooks/useAuth'
import introJs from 'intro.js'
import { Link } from 'react-router-dom'
import logo from '/logo-white-outline.svg'

const intro = introJs()

export const Navbar = () => {
	const { signOut: logout } = useAuth()
	const {
		manifest: { backgroundColor, shortName },
	} = useAppConfig()
	return (
		<header>
			<nav
				className="navbar navbar-expand-lg navbar-dark"
				style={{
					backgroundColor,
				}}
			>
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						<img
							src={logo}
							alt=""
							width="30"
							height="24"
							className="d-inline-block align-text-top me-1"
						/>
						<span>
							{shortName} <small>(AWS)</small>
						</span>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link" to="/assets">
									<ParcelIcon /> Assets
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/map">
									<IconWithText>
										<MapIcon /> Map
									</IconWithText>
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/about">
									<IconWithText>
										<InfoIcon /> About
									</IconWithText>
								</Link>
							</li>
							<li className="nav-item">
								<button
									type="button"
									className="btn btn-link nav-link"
									style={{ fontWeight: 'var(--bs-body-font-weight)' }}
									onClick={() => {
										intro.start()
									}}
								>
									<IconWithText>
										<HelpIcon /> Help
									</IconWithText>
								</button>
							</li>
						</ul>

						<form className="d-flex">
							<button
								type="button"
								className="btn btn-outline-light"
								onClick={logout}
							>
								<IconWithText>
									<LogoutIcon />
									Sign out
								</IconWithText>
							</button>
						</form>
					</div>
				</div>
			</nav>
		</header>
	)
}