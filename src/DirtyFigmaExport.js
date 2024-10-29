export function Underlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 40,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        pointerEvents: "none",
      }}>
      <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <p
          style={{
            fontFamily: "'Antonio', sans-serif",
            flex: "1 1 0%",
            height: 30,
            fontSize: 40,
            fontWeight: "700",
            lineHeight: "30px",
            color: "black",
            letterSpacing: -2,
          }}>
          Contact:
        </p>
        <div style={{ flex: "1 1 0%", display: "flex", gap: "2em" }}></div>
        <p style={{ flex: "1 1 0%", height: 30, fontSize: 30, lineHeight: "30px", textAlign: "right", color: "black" }}>⎑</p>
      </div>
      <div style={{ height: 40 }} />
      <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
        <p style={{ flex: "1 1 0%", height: "100%", fontSize: 20, lineHeight: "1.5em", color: "black" }}>
          <b>
            <a href="mailto:jeff@thecode.ninja">jeff@thecode.ninja</a>
          </b>

          <br />
          <b>—</b>
        </p>
        <div style={{ width: 10 }} />
        <p
          style={{
            transform: "rotate3d(0, 0, 1, 90deg) translate3d(100%,10px,0)",
            transformOrigin: "right",
            fontSize: 12,
            fontWeight: "700",
            lineHeight: "100%",
            textAlign: "right",
            color: "black",
            whiteSpace: "nowrap",
          }}>
          DRAG POINTER &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ●
        </p>
      </div>
      <div style={{ height: 10 }} />
      <div
        className="full"
        style={{
          fontFamily: "'Antonio', sans-serif",
          width: "100%",
          flex: "1 1 0%",
          padding: 0,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
        <p style={{ flex: "1 1 0%", fontSize: 250, lineHeight: "1em", color: "black", margin: 0, letterSpacing: -10 }}>Central City</p>
        <div style={{ width: 10 }} />
        <p style={{ flex: "1 1 0%", fontSize: 250, lineHeight: "100%", textAlign: "right", color: "black", margin: 0, letterSpacing: -10 }}>Coding</p>
      </div>
      <div style={{ height: 60 }} />
      <div
        style={{
          pointerEvents: "all",
          pointer: "auto",
          width: "100%",
          padding: 0,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
        <p className="full" style={{ whiteSpace: "nowrap", flex: "1 1 0%", fontSize: 12, lineHeight: "1.5em", color: "black" }}>
          <b>Wonders of Antiquity</b>
          <br />
        </p>
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            fontFamily: "'Antonio', sans-serif",
            flex: "1 1 0%",
            fontSize: 16,
            fontWeight: "700",
            lineHeight: "1em",
            textAlign: "center",
            color: "black",
            letterSpacing: -0.5,
            whiteSpace: "nowrap",
          }}>
          The Code Ninja
        </p>
        <div style={{ width: 10 }} />
        <p className="full" style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: "black" }}></p>
      </div>
    </div>
  )
}

export function Overlay() {
  return (
    <div style={{ position: "absolute", bottom: 40, right: 40 }}>
      <p style={{ flex: "1 1 0%", fontSize: 24, lineHeight: "1em", textAlign: "right", color: "black" }}>
        <a href="https://github.com/j-Kode">git</a>
      </p>
    </div>
  )
}
