import React from "react";

const ReportSvg = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 39 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      style={{ marginRight: "6px" }}
    >
      <rect width='39' height='40' fill='url(#patte2rn0)' />
      <defs>
        <pattern
          id='patte2rn0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_126_62'
            transform='translate(-0.48718 -1.25) scale(0.025641 0.025)'
          />
        </pattern>
        <image
          id='image0_126_62'
          width='83'
          height='110'
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAABuCAYAAABbVi9zAAAHrklEQVR4nO3dXWxbZxkH8P9z7NhO7MT2mrSxk7T56AZrmi+lSTaBpkrd2EDdusAKQ0i7QJO4QgJpF7ALBNoNEgKmMZSJMjE2wVLSCo3uYhdtsnHRbnWK+5FuKrSxQ1bXbuokTvwV55zzcHGcqarSKWvPOU7F85N8E8fnfd8n7/d7fEKwybGJifqLkeiLDL0HQI/T6dRa23b89eGBgV83Nzd/upFrMLNjJpHoOXXy1Asz8Zn9zKyAwAop6r69j/xoz549f7a4GJ+L7E7wD4def+XG4sIDxGgBUAWg6HZV5esbtsa3b99+Mljni7e0tJytqqoqFgoF/2wi0TU/v9gx+9/Zh9Pp9P2qptYC8AFQiKgIQGfmKqfDeX34wP4f7Ny586TdZVpjezAB4NKlS/WnPor8PJlKPcSMBoCDAJwErDBQArACEAPsAOAhwMHGDzQCcqQoyzt2bP/nVx8aGilqmvfdY+/+srtr9+i+vXtHKlGeNRUJ5hpmdkxGo8OXPvn391NzqS+XVlY9ILhg1Ni1vOkAVj0eTzocCn3U+eCXjnR2dp4gonzlcr6+igbzVszsSqfTDQ6Hw4ly3lwuV8nr9SYqnDUhhBBCCCGEEEIIIYQQQgghhBBCCCH+393RvUbz8/PbAYCZWdc9GpBfbmhoWL75d5jZOTc35/F4PJ5SyelWlKKDiJRgMBg3I+NCCCGEEEIIIYQQQgghxKZg+7d6k8mkV9d11jSNVVXltra2ot15sIqlwVxaWtpy+kx0//R07PFMZrFVVdVaMFxQoDCDiMBgXnVWVeX9df7Z9vb29/p7uw8Hg8FFK/NlFUuCGYlEvvHh6TPPL+eyTcQIAKgtfymfAagAVgAoAGoIcMB4QwVQALDo8/lmhoYGfj/Y3/+eFfmziunBHDt69KXLV2LDDHiIoREhX11dfT0UCp1rDjdGvV7v9W3btl0AgFQq1ZXL5bbOXk0NplLXenP5/BYAXhgBLnncnnhXZ+fhnp7df7v1wO52mNk9Pv7Bt89NTR0olYr+gYE9b+7bu/cts8u5HtODeXjsyKvTsfjTbpcr3dXV/dpAf+9oIBBY2MhnmdkzPv7+sxc+vniwUCi2APAAWAFhyeN2L4RDjZ+0NDVFfT7fQnNz88UiEaVmZzsL2Wzg00RyVzKVfDCfL9SD4dPBfgVQWttbDz/7zDM/Nbuc63GafUEmKAD0pqbw+4/t+2IPICk/DeYNAG9EIpFHP4yceT6bzW4jRqBYXGmcjs30Tk/PfA8EHcazOwhGd6EDpBNYY6MLUYnAOkNHuRuxg/nBZBAAjQnq3VxnYGDgOIDjCwsLgTNnzz4Ri8WfWFxcalK11Row3ADcKAeSQCVSqFhX6792f0fHRF9f9z+Oj0+8MB2Lfw3MignF2hDTg0kEJoDBzGZcrzyyj5ZfAIC5ublah8OhKIqiAIDf718iIu3mz42OjenA3f1BvyjTgwkmZoAJZEow17ORwaicPlmZj1uZ3wSIdQaYCbYV4jY0AI5yH24L8xNaa94mNfM7zgZYB0Mhtm+VZ3owCcRU+VpZEdY1AaLKPs2LiEDQ7exuLAumnc3r9unb29VYEkyucCABgMEEkG5n321ZzTQKU0HlbuaenhoxQQYg0zAzuPLBLPfZtrYOS6ZGMNbLFQ+o3cxv5mAdxkbHJggmk519twXLSdIBaJVeAVWC+c2cSSdAIyibIJhEdi4eLBjNmZnBDL3ic00AZOd+pvnBXGvelV5OAgDD1ppp/n4mAKL1R/LFxcUggADKUxZm1gOBwBwR5czOA4MJZO/UyIKddiIGO4nhTqfTLdHo+W/+58rl4aXl5QdGDv3RODc3WgTDOMcp/eo3Lxf8fn+svb19rGf3rrcbGhrMe5S4jQOhBWdAzACc07H4U4de/9OTDNTCqI03p1WEUTvdANyqqtam0+mt6XR6MBKJ/Ph3I69dGRwceHmov//vd5oPAhmLB2N2YQvTg6kYo7gHIIXBxEDGW119uTEcOtcSaozW1NReD4W2niciJZFI9WUL2abE1cQj15LJvkK+4GeCP7uc7Rs/MTHy21de/Ul3Z+dbvb3db27ZsmVpI+lnMpn7Tk9Gv3N+6vxXoEAh44TSFqb3KW+Pjb0Uj818vcrlKvXu7vrL4GD/aF1dXXojn81kMvdNTv7ruQsXP36uUCyEAbgArALI1NRUz4UaG6fCTeFobU3NjXA4fAEArl5N7srlcoHEtURvInmtN58vBMFwl+8gye/s6Dh68FvDPzO7nOsxPZijR478IhaLP9rauuOD7x48+OKdXicSiRw4NXnmh7nlbBsDAQJ5AF5rSQzjH4qsnZ1rxiEea4BSAHjJ5/PODg0Njgz29x8zoVgbYv4AxKSDeVWBcrfn5u8AeOfGjRtN56amnrpyOfZ4ZinToqqqF4AbIKW8c7oKxopTcRQDQX+so73tRE9X17H6+vqr5pRo40wPpg5dJ5CqQzelryoHZaT8AvDZFOuzOe1muWvOknkmA3y3NfPzbPTeJbuZvgJSoDATNLNq5r3E9GDq0HVi1pRNsdFhL0t2jWBin3kvMT+YRDoButRMkzCI2Matr83Cki04Il41boYTQgghhBBCCCGEEEIIIYQQQoiy/wFtghsKKPvk0gAAAABJRU5ErkJggg=='
        />
      </defs>
    </svg>
  );
};

export default ReportSvg;
