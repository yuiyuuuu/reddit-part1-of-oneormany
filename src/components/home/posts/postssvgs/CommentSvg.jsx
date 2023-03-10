import React from "react";

const CommentSvg = ({ id }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 84 82'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      style={{ marginRight: "6px" }}
    >
      <rect
        width='84'
        height='82'
        fill={`url(#pattern9102340-${id || "main"})`}
      />
      <defs>
        <pattern
          id={`pattern9102340-${id || "main"}`}
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_113_5'
            transform='scale(0.0119048 0.0121951)'
          />
        </pattern>
        <image
          id='image0_113_5'
          width='84'
          height='82'
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABSCAYAAADKMvPcAAALxElEQVR4nO2ca1BU5xnH/8+7uFxclt0FFhDU6opILkaBaJNGDWqiJkSCNpm2aSbpdDLT6fT2obnMpFN7yyTaNG1tJ0nTJJNMLjNqNBCTOGkUNWaKzQRzBQTxAqLCymXZxZVdl/P0wy549pyzyx4kCCy/GUb3Oec55z3/ed77BZhiivEMXekD2tra8s45nUsFswEAMQuJBUuCmQEws2A2gEP/Y4V72G9mwcF/Q3ZDmI/SdyjtEpHmdyjep3iXIfQu5pyczJbc3NxWIuqP6aOjMGJBn3vhpft6e3vvY5bWyp4TAOAFQCAQGEoxlKKANGyDcIRrBBAH30kgCDAIIAI4lA5igDmUAgYgEcDB53EAIBcACWAJIC8AP5G4aLGktdxYtGh7UVHRPiK6pF+VEQr65JYttwPiRQAzR+I/zjmTnJT01bdvWvr80pKSd4loQI+zbkGf3PKXXQBX6PWbaBDR2byZeZVla9f8xmKx9MTsp+clT255OmL2BDCAYJYnAAYAQu/zxyEDNputauPd63+RkZFxJhaHmD548+bNeRIZTqud6cT06SltGfbM1tys7C+TTSndJAUrCCJJMJOBiBMBkcLEiQCMzGwgIsHMUig7XQLgZ2Y/EQUg0QCTNEAsJIAZAsyKyoyICBKIgjcRMYmhi6H7iYUEwRIzswA4VEUxi2BlCQC9Lvfszq6uQud5Z5H3gjePmRM1Pt9vt9t3Vawv+4nNZusdTquEWARViNlCRNL8fMe20hUr/mW1Wk/F8ozxDDOTy+WaXX3go0eONTffw8wZsstGp9N5Z/WBA5uY+TEi8kd71rARKs/mBHyenDK9+fZVq58pLMyvuYJvGLccPXq09IO91c94vd5FcrsQ4nRp6YqHlxQXb4vmH1HQZ59/4dFet/tRANaQ6Uxqqrnm3o13/9xut7dfedLHL63t7de9s6vqFU+fp1huT0sz77//B9//XmpqqjOSr9Ay/q+2dpnb41mKkJgEuAzTEupLV5f+brKLCQCzsrO/Xr1y1cMJCQmtcrvb7VnQ0NBUGs1XU9DG+qM/ZObywd/McBbMdbx3bX5+3egkefyzYMG8/fkOx27IOhfMbG9obChn5qRIfipBOzs7c7tdruXya4lG48WiokXvjXaixzslxYtfTDQmnpSZDD09vfM6OjpyIvmoBHU6nYU+n2+B3JZmtZzLy8trGcW0Tghyc3Ob0yxmuaDw+X3pXV1dcyL5qAT1XLjgkCQpzGa1WdpG2redyBBRn81qPS63SZKU0td3MTuSj0pQt9tToLSZTaaItdpkx2RKPaswJbv7emdEul8lKBGMCtMlZpKU98UxIqxnpryoNEjq3pPEzHGX3SNCIBaRhxzVESqpG/t6h7AmOyxFzrEqQTXUF8Hx2fhEOTADhlFANfMwhDpCmZQ3J1CEKYZ4gIiV0agvy4M1HhCcL4pLNIs79dzYEOoI1VRfxK2gkkYLZ3AyUQt1GapRKcVzhGrM1EIIHREK0hjSE4hbQbXKS1VFJUMdoRRbUypu0BZPR4ROEUa08lKLWJpNU4QT0FUpaaHRFosbVI14QtReo4ag6jKDoS/sJxOqSokjl5+AZsNeX6022Qn12yMuOlMSU8NeROlqTXaEbGFECH2CskalFNcRqvPbYypDp7gcldGWXwKaERq/2TsKMWuiElTQVIRGg0FGosjjw+oIxdT8kRz1WHD0gSJ1LY/4bcRrIQWXZyojUkeETs1whhHK3iLMFGUGI5Y5pbgmNGUcJmAoajVRV0oa7a54nlNiYqVGpKtS0kKK4/FQrUUN+hY6aERjPEeohh6kEbVDxLbQIY7n5YWGeLoiFBrRGGnrXzzAGuLpi1CNaIzrOSUNPbREHmRqTmkE6GqHRnrCqKVmUqCrL6+e7ohWZkx+lHqQP1pvUiWUKTVVtQXxgqfPPhpJm4j0eTxhq5UZ3J+WmtoW6X6VoGmmlNPCILxyW3dPzxxmThu9ZE4MmDm129UTtkHBIAw9JlNKxI20KkGt1qzGRGNil9zW6+qd1dp6bt7oJXVi0NbWNqfX1TtXbktMNDrT09NPRPJRCZqdbWuxplma5Taf35/72RdHHhq9pE4Maj/74kGf3y8PpIA1zdqQlZV1LpKPxqYFulB4TcEOIvLJ7zvW3HxHfVPTbaOZ4PFMU1PT8mPNzWXA5YVyROLkgmvm7452Nolm7T1ndmGV2Wz+Um4LBAIzq/fu/+PZs2cLRy3V4xSn05n/n33VmwKBQL7MHDCbzV8Wzp//cTRfTUEzM6efLSkpelaQOC+3e/o8S3a8XflGQ0PDmlFI97ikrrFx2Zvb33re4+lbIbcLIb5aWrL4FbPZ3BnNP2IDlZkTd75d9bdjzc0PAEgOcyJqz3c43r3lO7c+ZbennSCa+AvMOjs7cw8eOvTQsebj5cy4AeHaNObPm/vaxoqKLcPtKIzaA3K5XNadle+87HQ61wFQHR9BRO0p01M67JmZxzPSM05ZzGnHiSSSFNMEl4+pGPxNBiY2hO65ZM/Orpk1Y8ansX78IB6PJ7Pp+PFlHOAkIimU24aOwpAEsyQRDQhmSRJCUp4d5fF6Le0dHQXnnecdfRe8uWCeCyBX8ZrGbLt9T9md636bmZnpGS5Nw3Ypu7u7Z721a9fWzm7XMgJs+j55iMH1QYzLh7wM4r6xePFzq1etekzPA1vOnbt299tV/3D39d1AgCVkZtnfAAgBYgQ4eLjMABgSKHiOEwA/ACOA1NCfVvFXm261/rd8fdkTWVlZHbGka9gzR2w2W6vb7f7x7vf2/P50W9tKZi6I8PJoRLvfpHd1X11d46pdO3Zu6e/vL4oSEdNUJ2nFPiLRTkRfzJo589Da21f/M5bDWwaJ6RAXs9ncxcy//KS2dkNNzeEHL17s/xYABzSKgRHAgBTzTr3a2tp73/9gz58UNfBo0QLQ58mJxjPLbrl5Z3FxcbXeB8QkKDC0X2cHM1fV1n5+x6ef1W7scfXOhsQmEDIISGUgBfI4IPiIEQAADp7r1A+QFeAU2aMHADHsXlJmpoOHDv1q7/6Pfi1JAxq7gclLYL8UOpYt+EpIAKShJZoESyh9wd8MFwhtALeSEB6LOa21eHHx/pKSRR8TUSBWbeTELOhQsoPH7FQCqGTm5NOnTzs6OjsLBLNBIhIkkaDQTpLByoEkGmDBLJjFseYT60+2tNwDDO16HjxAKyLMnLT73fc31x89ej8zW8MvosmWbjmycOHCyoSEhIthhxgyWHYgocaqQgMLIQ1kZma25OXltYzGmQC6BZVDRBcBfB36i4kP9+2bdbKl5S4MCUpRszwzp23bsfPZky2n1oNhUlyuyc6xHywvK3tKTzn3TXJFgo4I9VohjlQpeTwe+yuvvf5qe3vHSiBsHz8TYd88R/6ejRXrt440e34TjL2gzIbQEZWDCK2ZxfPnzxe8uX37y91dPTchvH4eIKK9N1x33Y5169a8NAYp1sWYC8pMRnBYO1Qoz5w7derUzW9u2/Gy1+tVHtfhEyT2L1la8kbp8uWvf/Op1c+YC0rERoS3SwUBQ+cg1dXVle+qfGerz++fJfdjoHtawrSaW0uX//vGxYurxiq9ehn7LA+RqHivYJCRmenw4U9+9v4HH24KBALpCqeOpMSkj++6486n8/PnHB7DxOpm7CMU0jSEdz3BEifvqz7w50+PHPkpMycrXNpNJtPB71aU/yEnJ6d+7FI6Msa+DFXvvTd8XV//gN/vN2psI2+32Sx779mw4XGbzdaKCcBVyPJqfD6fMioBoCMnK2vPhoryR4YbgxxPjAtBlRBR5zyH462NFeWPEJF3eI/xw9Voh0YdqSKivoXXX//qujW3Pa6Y15oQjH0ZGuV0CCGEb+mSkr+uWLZs00SdBRhzQRMidBMTEhL8pctXPFpcvGjrRBUTuAqr7+Y5HNuTkpLCsnJSUpKnvPyujSUli/8+kcUErsI588xMjY2NP9p34NATHo/bZrNZj5etW3v/jBkzasc6LZMKZiZmnlomOcUUY8r/AeEz4NyvIffvAAAAAElFTkSuQmCC'
        />
      </defs>
    </svg>
  );
};

export default CommentSvg;
