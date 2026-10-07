import { Link, useSearchParams } from "react-router-dom";
import "./CardRegion.css";

function CardRegion({
  url,
  img,
  region,
  className = "",
  header = false,
  ...props
}) {
  const [searchParams] = useSearchParams();
  const regionActual = searchParams.get("region");
  const regionId = url.split("region=")[1];
  const seleccionada = regionActual === regionId;

  return url ? (
    <Link
      to={url}
      {...props}
      className={`${className} ${
        header ? "card-region-header" : "card-region"
      } ${header && seleccionada ? `region-${regionId}` : ""}`}
    >
      <img src={img} />
      <p className="nombre-region">{region}</p>
    </Link>
  ) : (
    <div
      {...props}
      className={`card-region ${className} ${
        seleccionada ? `region-${regionId}` : ""
      }`}
    >
      <img src={img} />
      <p className="nombre-region">{region}</p>
    </div>
  );
}

export default CardRegion;
