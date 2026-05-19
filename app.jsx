import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Minus,
  Plus,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Package,
  Settings,
  LogOut,
  Lock,
  Edit,
  Trash2,
  Save,
  Sparkles,
  Bot,
  X,
  Loader2,
  Upload,
  ImageIcon
} from "lucide-react";
const callGemini = async (prompt) => {
  const apiKey = "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  let retries = 5;
  let delay = 1e3;
  while (retries > 0) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  }
};
const initialProducts = [
  {
    id: 1,
    name: "Aceite Bajaj 20W50",
    brand: "Bajaj",
    reference: "BGO-20W50-1.2LT2W",
    price: 13,
    condition: "Nuevo",
    category: "L\xEDquidos",
    stock: 24,
    image: "oil",
    images: [],
    description: "Aceite original Bajaj 20W50 DTS-i Oil Mineral 4T 1.2 LT."
  },
  {
    id: 2,
    name: "Kit de Arrastre Reforzado (Pulsar 200 NS)",
    brand: "Choho",
    reference: "KIT-P200-CH",
    price: 45,
    condition: "Nuevo",
    category: "Tren Trasero",
    stock: 5,
    image: "chain",
    images: [],
    description: "Kit de arrastre completo que incluye cadena reforzada con O-rings, pi\xF1\xF3n y corona. Dise\xF1ado para una mayor durabilidad y transferencia de potencia suave."
  },
  {
    id: 3,
    name: "Carburador Cortina Plana 30mm",
    brand: "Keihin (Original)",
    reference: "CRB-PWK-30",
    price: 35,
    condition: "Usado",
    category: "Motor",
    stock: 1,
    image: "carb",
    images: [],
    description: "Carburador de segunda mano en excelente estado. Cortina plana para una respuesta de aceleraci\xF3n inmediata. Limpio y listo para instalar. Ideal para proyectos de potenciaci\xF3n."
  },
  {
    id: 4,
    name: "Pastillas de Freno Delanteras Sinterizadas",
    brand: "Brembo",
    reference: "BRM-PAD-001",
    price: 25,
    condition: "Nuevo",
    category: "Tren Delantero",
    stock: 15,
    image: "pads",
    images: [],
    description: "Pastillas de freno sinterizadas de alta fricci\xF3n. Ofrecen un frenado potente y consistente en cualquier condici\xF3n clim\xE1tica."
  }
];
const initialOrders = [
  {
    id: "ORD-001",
    date: "05/05/2026",
    client: "Juan P\xE9rez",
    phone: "+503 7123 4567",
    total: 13,
    status: "Entregado",
    deliveryMethod: "delivery",
    address: { depto: "Santa Ana", muni: "Santa Ana", colonia: "Colonia El Tr\xE9bol", ref: "Frente a la cancha r\xE1pida" }
  },
  {
    id: "ORD-002",
    date: "06/05/2026",
    client: "Mar\xEDa L\xF3pez",
    phone: "+503 6123 9876",
    total: 45,
    status: "En Camino",
    deliveryMethod: "pickup",
    address: null
  }
];
const initialClients = [
  {
    id: "CLI-01",
    name: "Juan P\xE9rez",
    email: "juan.perez@email.com",
    phone: "+503 7123 4567",
    registered: "10/01/2026",
    address: {
      depto: "Santa Ana",
      muni: "Santa Ana",
      colonia: "Colonia El Tr\xE9bol",
      ref: "Frente a la cancha r\xE1pida"
    }
  },
  {
    id: "CLI-02",
    name: "Mar\xEDa L\xF3pez",
    email: "m.lopez@email.com",
    phone: "+503 6123 9876",
    registered: "15/03/2026",
    address: {
      depto: "San Salvador",
      muni: "Soyapango",
      colonia: "Residencial Los Santos",
      ref: "Casa verde de dos plantas"
    }
  }
];
const Logo = () => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "bg-red-600 text-white font-black text-3xl italic tracking-tighter p-2 rounded-lg transform -skew-x-12 shadow-lg", children: "MRR" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 151,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col uppercase font-bold text-slate-800 leading-none", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "Moto Repuestos" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 155,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("span", { className: "text-sm tracking-widest text-slate-500", children: "Romero" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 156,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 154,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 150,
  columnNumber: 3
});
const ProductImagePlaceholder = ({ type, src }) => {
  if (src) {
    return /* @__PURE__ */ jsxDEV("img", { src, alt: "Producto", className: "w-full h-full object-contain p-2 drop-shadow-sm" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 163,
      columnNumber: 12
    });
  }
  const icons = {
    oil: /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-gradient-to-br from-yellow-200 to-amber-500 flex items-center justify-center text-amber-900 font-bold text-2xl", children: "ACEITE 1L" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 167,
      columnNumber: 10
    }),
    chain: /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-slate-800 font-bold text-2xl", children: /* @__PURE__ */ jsxDEV(Settings, { size: 64 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 168,
      columnNumber: 156
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 168,
      columnNumber: 12
    }),
    carb: /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-400 flex items-center justify-center text-zinc-700 font-bold text-2xl", children: "CARBURADOR" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 169,
      columnNumber: 11
    }),
    pads: /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-gradient-to-br from-red-200 to-red-400 flex items-center justify-center text-red-800 font-bold text-2xl", children: "FRENOS" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 170,
      columnNumber: 11
    }),
    default: /* @__PURE__ */ jsxDEV(ImageIcon, { size: 64, className: "text-slate-400" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 171,
      columnNumber: 14
    })
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-slate-100 flex items-center justify-center", children: icons[type] || icons.default }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 175,
    columnNumber: 5
  });
};
const Header = ({ goHome, cart, logout, setIsCartOpen, searchQuery = "", handleSearch = () => {
} }) => /* @__PURE__ */ jsxDEV("header", { className: "bg-white w-full z-50 shadow-sm border-b border-slate-200", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 flex justify-between items-center", children: /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto flex justify-between items-center", children: [
    /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV(Phone, { size: 14 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 188,
        columnNumber: 48
      }),
      " L\xEDnea de atenci\xF3n WhatsApp +503 6995 4221"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 188,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 hidden sm:flex", children: /* @__PURE__ */ jsxDEV("span", { children: "USD $ \u25BC" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 190,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 189,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 187,
    columnNumber: 7
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 186,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4 py-4 sm:py-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "cursor-pointer hover:opacity-90 transition-opacity", onClick: () => goHome("all"), children: /* @__PURE__ */ jsxDEV(Logo, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 200,
        columnNumber: 11
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 199,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 max-w-xl hidden md:block w-full order-3 md:order-none mt-4 md:mt-0", children: /* @__PURE__ */ jsxDEV("div", { className: "flex w-full", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            placeholder: "B\xFAsqueda de repuestos por nombre, marca o referencia...",
            value: searchQuery,
            onChange: (e) => handleSearch(e.target.value),
            className: "w-full px-4 py-2 border border-slate-300 rounded-l-lg focus:outline-none focus:border-red-500"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 205,
            columnNumber: 13
          }
        ),
        /* @__PURE__ */ jsxDEV("button", { className: "bg-red-600 hover:bg-red-700 text-white px-6 rounded-r-lg transition-colors", children: /* @__PURE__ */ jsxDEV(Search, { size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 213,
          columnNumber: 15
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 212,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 204,
        columnNumber: 11
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 203,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 md:gap-6 order-2", children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "relative cursor-pointer bg-slate-100 p-2 rounded-lg hover:bg-slate-200 transition-colors",
            onClick: () => setIsCartOpen(true),
            title: "Ver Carrito",
            children: [
              /* @__PURE__ */ jsxDEV(ShoppingCart, { size: 24, className: "text-slate-800" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 224,
                columnNumber: 13
              }),
              cart.length > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full", children: cart.length }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 226,
                columnNumber: 15
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 219,
            columnNumber: 11
          }
        ),
        /* @__PURE__ */ jsxDEV("button", { onClick: logout, className: "text-slate-400 hover:text-red-500 transition-colors ml-2", title: "Cerrar sesi\xF3n / Salir", children: /* @__PURE__ */ jsxDEV(LogOut, { size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 232,
          columnNumber: 13
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 231,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 218,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 197,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex w-full md:hidden mt-4", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          placeholder: "B\xFAsqueda de repuestos...",
          value: searchQuery,
          onChange: (e) => handleSearch(e.target.value),
          className: "w-full px-4 py-2 border border-slate-300 rounded-l-lg focus:outline-none focus:border-red-500"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 239,
          columnNumber: 11
        }
      ),
      /* @__PURE__ */ jsxDEV("button", { className: "bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-lg transition-colors", children: /* @__PURE__ */ jsxDEV(Search, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 247,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 246,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 238,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 196,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("nav", { className: "border-t border-slate-100 bg-slate-50", children: /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxDEV("ul", { className: "flex items-center space-x-8 overflow-x-auto py-3 text-sm font-bold text-slate-700 uppercase tracking-wide", children: [
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 flex items-center gap-2 text-slate-400 hover:text-slate-800 cursor-pointer", onClick: () => goHome("all"), children: [
      /* @__PURE__ */ jsxDEV(Menu, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 257,
        columnNumber: 13
      }),
      " Todas"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 256,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("Nuevo"), children: "Nuevos" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 259,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("Usado"), children: "Usados" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 260,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 text-slate-300", children: "|" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 261,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("Motor"), children: "Motor" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 262,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("Accesorios"), children: "Accesorios" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 263,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("El\xE9ctrico"), children: "El\xE9ctrico" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 264,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("Tren Delantero"), children: "Tren Delantero" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 265,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("Tren Trasero"), children: "Tren Trasero" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 266,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("Parte Media"), children: "Parte Media" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 267,
      columnNumber: 11
    }),
    /* @__PURE__ */ jsxDEV("li", { className: "flex-shrink-0 hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("L\xEDquidos"), children: "L\xEDquidos" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 268,
      columnNumber: 11
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 255,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 254,
    columnNumber: 7
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 253,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 184,
  columnNumber: 3
});
const Footer = () => /* @__PURE__ */ jsxDEV("footer", { className: "bg-slate-50 pt-16 pb-8 border-t border-slate-200 mt-12", children: /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-start justify-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV(Logo, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 282,
        columnNumber: 33
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 282,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 text-sm leading-relaxed max-w-xs", children: "Tu tienda de confianza para repuestos de motocicletas. Calidad, garant\xEDa y servicio al mejor precio." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 283,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 281,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-center space-y-4 text-slate-600 text-sm", children: [
      /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-slate-800 uppercase tracking-wider mb-1", children: "Contacto" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 290,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0", children: /* @__PURE__ */ jsxDEV(Phone, { size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 292,
          columnNumber: 122
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 292,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "+503 6995 4221" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 293,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 291,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0", children: /* @__PURE__ */ jsxDEV(Mail, { size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 296,
          columnNumber: 122
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 296,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "font-medium break-all", children: "ventadepiezas350@gmail.com" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 297,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 295,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0", children: /* @__PURE__ */ jsxDEV(MapPin, { size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 300,
          columnNumber: 122
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 300,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "font-medium leading-tight", children: "Colonia las victorias, calle los olivos, cant\xF3n primavera, #9, Santa Ana, El Salvador." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 301,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 299,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 289,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-center space-y-4 text-slate-600 text-sm", children: [
      /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-slate-800 uppercase tracking-wider mb-1", children: "S\xEDguenos" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 307,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV(
        "a",
        {
          href: "https://www.facebook.com/share/1CpAiLjA5M/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-3 hover:text-red-600 cursor-pointer transition-colors",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 flex-shrink-0 bg-slate-900 text-white rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Facebook, { size: 16 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 314,
              columnNumber: 120
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 314,
              columnNumber: 13
            }),
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "Moto Repuestos Romero" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 315,
              columnNumber: 13
            })
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 308,
          columnNumber: 11
        }
      ),
      /* @__PURE__ */ jsxDEV(
        "a",
        {
          href: "https://www.instagram.com/motorepuestosromero_sv?igsh=MTk1MDZna3d0OGllcA==",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-3 hover:text-red-600 cursor-pointer transition-colors",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 flex-shrink-0 bg-slate-900 text-white rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Instagram, { size: 16 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 323,
              columnNumber: 120
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 323,
              columnNumber: 13
            }),
            /* @__PURE__ */ jsxDEV(
              "span",
              {
                className: "font-medium",
                onClick: (e) => {
                  e.preventDefault();
                  window.open("https://www.instagram.com/motorepuestosromero_sv?igsh=MTk1MDZna3d0OGllcA==", "_blank", "noopener");
                },
                children: "motorepuestosromero_sv"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 324,
                columnNumber: 13
              }
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 317,
          columnNumber: 11
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 306,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 279,
    columnNumber: 7
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500", children: /* @__PURE__ */ jsxDEV("p", { children: "Copyright \xA9 2026 MRR | Moto Repuestos Romero. Todos los derechos reservados." }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 339,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 338,
    columnNumber: 7
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 277,
  columnNumber: 5
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 276,
  columnNumber: 3
});
const CartDrawer = ({ isOpen, setIsOpen, cart, setCart, setOrders, setClients }) => {
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", depto: "", muni: "", ref: "", colonia: "" });
  if (!isOpen) return null;
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = deliveryMethod === "delivery" ? subtotal > 40 ? "Acordar" : 6 : 0;
  const total = typeof shippingCost === "number" ? subtotal + shippingCost : subtotal;
  const handleRemove = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };
  const handleCheckout = () => {
    if (cart.length === 0) return alert("El carrito est\xE1 vac\xEDo");
    if (!deliveryMethod) return alert("Selecciona un m\xE9todo de entrega");
    if (deliveryMethod === "delivery") {
      if (!formData.name || !formData.phone || !formData.depto || !formData.muni || !formData.colonia) {
        return alert("Por favor, completa los campos obligatorios para el env\xEDo.");
      }
    }
    const clientId = `CLI-${Date.now()}`;
    const newClient = {
      id: clientId,
      name: formData.name || "Cliente An\xF3nimo",
      email: formData.email || "",
      phone: formData.phone || "",
      registered: (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES"),
      address: deliveryMethod === "delivery" ? {
        depto: formData.depto,
        muni: formData.muni,
        colonia: formData.colonia,
        ref: formData.ref
      } : null
    };
    if (setClients) {
      setClients((prev) => {
        const exists = prev.some((c) => c.phone && c.phone.replace(/\D/g, "") === (newClient.phone || "").replace(/\D/g, ""));
        if (exists) return prev;
        return [newClient, ...prev];
      });
    }
    const orderId = `ORD-${Date.now()}`;
    const order = {
      id: orderId,
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES"),
      client: newClient.name,
      phone: newClient.phone,
      total,
      status: "Pendiente",
      deliveryMethod: deliveryMethod === "delivery" ? "delivery" : "pickup",
      address: newClient.address,
      items: cart.map((i) => ({ id: i.id, name: i.name, qty: i.quantity, price: i.price }))
    };
    if (setOrders) {
      setOrders((prev) => [order, ...prev]);
    }
    let msg = `*NUEVO PEDIDO - MRR* \u{1F3CD}\uFE0F
`;
    msg += `------------------------
`;
    if (deliveryMethod === "delivery") {
      msg += `*Cliente:* ${formData.name}
`;
      msg += `*Tel\xE9fono:* ${formData.phone}
`;
      msg += `*M\xE9todo:* Env\xEDo a domicilio \u{1F69A}
`;
      msg += `*Direcci\xF3n:* ${formData.depto}, ${formData.muni}, ${formData.colonia}. Ref: ${formData.ref}
`;
    } else {
      msg += `*Cliente:* ${formData.name || "No especificado"}
`;
      msg += `*Tel\xE9fono:* ${formData.phone || "No especificado"}
`;
      msg += `*M\xE9todo:* Retiro en Tienda \u{1F3EA}
`;
    }
    msg += `------------------------
`;
    msg += `*PRODUCTOS:*
`;
    cart.forEach((item) => {
      msg += `- ${item.quantity}x ${item.name} ($${item.price})
`;
    });
    msg += `------------------------
`;
    msg += `*Subtotal:* $${subtotal}
`;
    msg += `*Env\xEDo:* ${shippingCost === "Acordar" ? "Se acordar\xE1 por WhatsApp" : "$" + shippingCost}
`;
    msg += `*TOTAL APROX:* $${total} ${shippingCost === "Acordar" ? "+ Env\xEDo" : ""}
`;
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/50369954221?text=${encodedMsg}`, "_blank");
    setCart([]);
    setDeliveryMethod("");
    setFormData({ name: "", phone: "", depto: "", muni: "", ref: "", colonia: "" });
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[100] flex justify-end", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-slate-900/50 backdrop-blur-sm", onClick: () => setIsOpen(false) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 446,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-fadeIn", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold text-slate-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(ShoppingCart, { size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 450,
            columnNumber: 13
          }),
          " Mi Carrito"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 449,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setIsOpen(false), className: "p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 453,
          columnNumber: 13
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 452,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 448,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4", children: cart.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "h-full flex flex-col items-center justify-center text-slate-400", children: [
        /* @__PURE__ */ jsxDEV(ShoppingCart, { size: 64, className: "mb-4 opacity-50" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 460,
          columnNumber: 15
        }),
        /* @__PURE__ */ jsxDEV("p", { children: "Tu carrito est\xE1 vac\xEDo" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 461,
          columnNumber: 15
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 459,
        columnNumber: 13
      }) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: cart.map((item, idx) => /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 bg-white rounded-md border border-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxDEV(ProductImagePlaceholder, { type: item.image, src: item.images?.[0] }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 470,
            columnNumber: 23
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 469,
            columnNumber: 21
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-slate-800 leading-tight", children: item.name }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 473,
              columnNumber: 23
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: [
              "Cant: ",
              item.quantity,
              " x $",
              item.price
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 474,
              columnNumber: 23
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-black text-red-600 mt-1", children: [
              "$",
              item.price * item.quantity
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 475,
              columnNumber: 23
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 472,
            columnNumber: 21
          }),
          /* @__PURE__ */ jsxDEV("button", { onClick: () => handleRemove(idx), className: "text-slate-400 hover:text-red-600 self-start p-1", children: /* @__PURE__ */ jsxDEV(Trash2, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 478,
            columnNumber: 23
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 477,
            columnNumber: 21
          })
        ] }, idx, true, {
          fileName: "<stdin>",
          lineNumber: 468,
          columnNumber: 19
        })) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 466,
          columnNumber: 15
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-200 pt-6", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide", children: "M\xE9todo de Entrega" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 486,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV("label", { className: `flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${deliveryMethod === "pickup" ? "border-red-500 bg-red-50" : "border-slate-200 hover:bg-slate-50"}`, children: [
              /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "delivery", value: "pickup", onChange: (e) => setDeliveryMethod(e.target.value), className: "text-red-600 focus:ring-red-500 w-4 h-4" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 489,
                columnNumber: 21
              }),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-sm text-slate-800", children: "Retirar en Tienda" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 491,
                  columnNumber: 23
                }),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: "Gratis - Santa Ana, El Salvador" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 492,
                  columnNumber: 23
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 490,
                columnNumber: 21
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 488,
              columnNumber: 19
            }),
            /* @__PURE__ */ jsxDEV("label", { className: `flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${deliveryMethod === "delivery" ? "border-red-500 bg-red-50" : "border-slate-200 hover:bg-slate-50"}`, children: [
              /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "delivery", value: "delivery", onChange: (e) => setDeliveryMethod(e.target.value), className: "text-red-600 focus:ring-red-500 w-4 h-4" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 496,
                columnNumber: 21
              }),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-sm text-slate-800", children: "Env\xEDo a Domicilio" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 498,
                  columnNumber: 23
                }),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: "Fijo $6 (Menos de $40 y poco peso)" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 499,
                  columnNumber: 23
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 497,
                columnNumber: 21
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 495,
              columnNumber: 19
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 487,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 485,
          columnNumber: 15
        }),
        deliveryMethod && /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-200 pt-6 space-y-4 animate-fadeIn", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-800 text-sm uppercase tracking-wide", children: "Datos del Cliente" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 508,
            columnNumber: 19
          }),
          /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Nombre y Apellido *", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-red-500" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 509,
            columnNumber: 19
          }),
          /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "N\xFAmero de Tel\xE9fono *", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-red-500" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 510,
            columnNumber: 19
          }),
          deliveryMethod === "delivery" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-800 text-sm uppercase tracking-wide pt-2 border-t border-slate-100", children: "Direcci\xF3n de Env\xEDo" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 514,
              columnNumber: 23
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Departamento *", value: formData.depto, onChange: (e) => setFormData({ ...formData, depto: e.target.value }), className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-red-500" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 516,
                columnNumber: 25
              }),
              /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Municipio *", value: formData.muni, onChange: (e) => setFormData({ ...formData, muni: e.target.value }), className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-red-500" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 517,
                columnNumber: 25
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 515,
              columnNumber: 23
            }),
            /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Colonia o Cant\xF3n *", value: formData.colonia, onChange: (e) => setFormData({ ...formData, colonia: e.target.value }), className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-red-500" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 519,
              columnNumber: 23
            }),
            /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Punto de Referencia", value: formData.ref, onChange: (e) => setFormData({ ...formData, ref: e.target.value }), className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-red-500" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 520,
              columnNumber: 23
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 italic", children: "* Nota: Si tu pedido supera los $40 o es muy pesado, el costo de la encomienda ser\xE1 acordado por WhatsApp." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 521,
              columnNumber: 23
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 513,
            columnNumber: 21
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 507,
          columnNumber: 17
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 464,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 457,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-t border-slate-200 bg-slate-50", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Subtotal" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 532,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-slate-800", children: [
            "$",
            subtotal
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 533,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 531,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Env\xEDo" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 536,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-slate-800", children: shippingCost === "Acordar" ? "Por acordar" : `$${shippingCost}` }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 537,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 535,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleCheckout,
            disabled: cart.length === 0,
            className: "w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg",
            children: [
              "Comprar por WhatsApp ",
              /* @__PURE__ */ jsxDEV(ChevronRight, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 546,
                columnNumber: 34
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 541,
            columnNumber: 11
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 530,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 447,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 445,
    columnNumber: 5
  });
};
const LoginScreen = ({ setRole, setView }) => {
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (pin === "2226") {
      setRole("admin");
      setView("admin");
    } else {
      setError("PIN incorrecto. Intenta de nuevo.");
      setPin("");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 572,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 573,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-8 text-center bg-slate-50 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-red-600 text-white font-black text-4xl italic tracking-tighter py-3 px-4 rounded-xl transform -skew-x-12 shadow-[0_0_20px_rgba(220,38,38,0.5)]", children: "MRR" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 578,
          columnNumber: 13
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 577,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-slate-800 uppercase tracking-wide", children: "Moto Repuestos Romero" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 582,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 text-sm mt-2", children: "Nuevos y Usados de Alta Calidad" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 583,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 576,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "p-8 space-y-6", children: !showAdminPin ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setRole("client");
              setView("store");
            },
            className: "w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1",
            children: [
              /* @__PURE__ */ jsxDEV(User, { size: 24 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 593,
                columnNumber: 17
              }),
              " Entrar como Cliente"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 589,
            columnNumber: 15
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center py-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex-grow border-t border-slate-200" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 597,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "flex-shrink-0 mx-4 text-slate-400 text-sm", children: "o" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 598,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-grow border-t border-slate-200" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 599,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 596,
          columnNumber: 15
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setShowAdminPin(true),
            className: "w-full py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
            children: [
              /* @__PURE__ */ jsxDEV(Lock, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 606,
                columnNumber: 17
              }),
              " Acceso Administrativo"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 602,
            columnNumber: 15
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 588,
        columnNumber: 13
      }) : /* @__PURE__ */ jsxDEV("form", { onSubmit: handleAdminLogin, className: "space-y-4 animate-fadeIn", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "PIN de Administrador" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 612,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "password",
              value: pin,
              onChange: (e) => setPin(e.target.value),
              className: "w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-center text-2xl tracking-widest",
              placeholder: "\u2022\u2022\u2022\u2022",
              autoFocus: true
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 613,
              columnNumber: 17
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 611,
          columnNumber: 15
        }),
        error && /* @__PURE__ */ jsxDEV("p", { className: "text-red-500 text-sm text-center font-medium", children: error }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 622,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => {
                setShowAdminPin(false);
                setError("");
                setPin("");
              },
              className: "flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors",
              children: "Volver"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 624,
              columnNumber: 17
            }
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              className: "flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-red-500/30",
              children: "Ingresar"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 631,
              columnNumber: 17
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 623,
          columnNumber: 15
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 610,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 586,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 575,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 571,
    columnNumber: 5
  });
};
import QRCode from "qrcode";
const StoreFront = ({ goHome, goToProduct, cart, logout, products, handleAddToCart, setIsCartOpen, activeFilter, searchQuery, handleSearch }) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const generateQrForApp = async () => {
    setIsGeneratingQr(true);
    try {
      const url = window.location.href.split("#")[0];
      const dataUrl = await QRCode.toDataURL(url, { margin: 2, width: 360 });
      setQrDataUrl(dataUrl);
      setIsQrOpen(true);
    } catch (err) {
      alert("Error generando QR. Intenta de nuevo.");
      console.error(err);
    } finally {
      setIsGeneratingQr(false);
    }
  };
  const downloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `MRR_app_qr_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  const filteredProducts = products.filter((p) => {
    const matchCategory = activeFilter === "all" || p.condition === activeFilter || p.category === activeFilter;
    const term = searchQuery.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(term) || p.brand && p.brand.toLowerCase().includes(term) || p.reference && p.reference.toLowerCase().includes(term);
    return matchCategory && matchSearch;
  });
  const getTitle = () => {
    if (searchQuery) return `Resultados para "${searchQuery}"`;
    if (activeFilter === "Nuevo") return "Cat\xE1logo - Repuestos Nuevos";
    if (activeFilter === "Usado") return "Cat\xE1logo - Repuestos Usados";
    if (["Motor", "Accesorios", "El\xE9ctrico", "Tren Delantero", "Tren Trasero", "Parte Media", "L\xEDquidos"].includes(activeFilter)) {
      return `Cat\xE1logo - ${activeFilter}`;
    }
    return "Cat\xE1logo Completo de Productos";
  };
  const handleAssistantSubmit = async (e) => {
    e.preventDefault();
    if (!assistantQuery.trim()) return;
    setIsAssistantLoading(true);
    setAssistantResponse("");
    try {
      const prompt = `Eres un mec\xE1nico experto de motos amigable trabajando para la tienda 'Moto Repuestos Romero'. Un cliente te pregunta: "${assistantQuery}". Dale un diagn\xF3stico o consejo breve, amigable y directo (m\xE1ximo 3 a 4 l\xEDneas cortas). Recomi\xE9ndale qu\xE9 tipo de repuesto buscar en nuestra tienda si aplica. Usa un tono experto y servicial.`;
      const result = await callGemini(prompt);
      setAssistantResponse(result);
    } catch (error) {
      setAssistantResponse("Lo siento, los mec\xE1nicos estamos muy ocupados ahora mismo. Por favor, intenta consultar de nuevo en unos minutos.");
    } finally {
      setIsAssistantLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-white min-h-screen", children: [
    /* @__PURE__ */ jsxDEV(Header, { goHome, cart, logout, setIsCartOpen, searchQuery, handleSearch }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 728,
      columnNumber: 7
    }),
    activeFilter === "all" && !searchQuery && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 text-white py-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-slate-900" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 733,
        columnNumber: 12
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center", children: /* @__PURE__ */ jsxDEV("div", { className: "md:w-1/2 space-y-6", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest", children: "Acelerando tu pasi\xF3n" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 736,
          columnNumber: 17
        }),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight", children: [
          "El repuesto exacto ",
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 738,
            columnNumber: 38
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-red-500", children: "al mejor precio" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 738,
            columnNumber: 44
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 737,
          columnNumber: 17
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 max-w-md text-lg", children: "Encuentra piezas originales nuevas y repuestos usados garantizados para todas las marcas." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 740,
          columnNumber: 17
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 735,
        columnNumber: 15
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 734,
        columnNumber: 12
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 732,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("main", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-slate-800 mb-8 border-b-2 border-red-600 pb-2 inline-block uppercase tracking-wide", children: getTitle() }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 747,
        columnNumber: 9
      }),
      filteredProducts.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-20 bg-slate-50 rounded-xl border border-slate-200", children: [
        /* @__PURE__ */ jsxDEV(Search, { size: 48, className: "mx-auto text-slate-300 mb-4" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 753,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-slate-700", children: "No se encontraron productos." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 754,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 mt-2", children: "Intenta buscar con otros t\xE9rminos o cambia la categor\xEDa." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 755,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => goHome("all"), className: "mt-6 bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors", children: "Ver todo el cat\xE1logo" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 756,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 752,
        columnNumber: 11
      }) : /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: filteredProducts.map((p) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl transition-all group flex flex-col", children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "relative h-56 bg-slate-50 p-4 cursor-pointer overflow-hidden",
            onClick: () => goToProduct(p),
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 z-10", children: /* @__PURE__ */ jsxDEV("span", { className: `text-xs font-bold px-2 py-1 rounded shadow-sm ${p.condition === "Nuevo" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`, children: p.condition }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 769,
                columnNumber: 21
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 768,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full transform group-hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxDEV(ProductImagePlaceholder, { type: p.image, src: p.images && p.images.length > 0 ? p.images[0] : null }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 774,
                columnNumber: 21
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 773,
                columnNumber: 19
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 764,
            columnNumber: 17
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mb-1 font-semibold tracking-wider", children: p.brand }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 778,
            columnNumber: 19
          }),
          /* @__PURE__ */ jsxDEV(
            "h3",
            {
              className: "font-bold text-slate-800 mb-2 leading-tight cursor-pointer hover:text-red-600 transition-colors flex-grow",
              onClick: () => goToProduct(p),
              children: p.name
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 779,
              columnNumber: 19
            }
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-end justify-between mt-4", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-red-600", children: [
              "$",
              p.price
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 786,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleAddToCart(p, 1),
                className: "w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors",
                children: /* @__PURE__ */ jsxDEV(ShoppingCart, { size: 18 }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 791,
                  columnNumber: 23
                })
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 787,
                columnNumber: 21
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 785,
            columnNumber: 19
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 777,
          columnNumber: 17
        })
      ] }, p.id, true, {
        fileName: "<stdin>",
        lineNumber: 763,
        columnNumber: 15
      })) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 761,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-6 right-6 z-50 flex flex-col items-end", children: [
        isAssistantOpen && /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 mb-4 overflow-hidden animate-fadeIn", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 text-white p-4 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Bot, { size: 20, className: "text-red-500" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 806,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-sm", children: "Asesor Mec\xE1nico AI \u2728" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 807,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 805,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("button", { onClick: () => setIsAssistantOpen(false), className: "text-slate-400 hover:text-white transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 18 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 810,
              columnNumber: 19
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 809,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 804,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 h-64 overflow-y-auto bg-slate-50 flex flex-col gap-3 text-sm", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-200 text-slate-800 p-3 rounded-lg rounded-tl-none w-[85%] self-start shadow-sm", children: "\xA1Hola! Soy tu mec\xE1nico virtual de Moto Repuestos Romero. \xBFQu\xE9 problema tiene tu moto o qu\xE9 repuesto buscas?" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 814,
              columnNumber: 17
            }),
            assistantQuery && isAssistantLoading && /* @__PURE__ */ jsxDEV("div", { className: "bg-red-600 text-white p-3 rounded-lg rounded-tr-none w-[85%] self-end shadow-sm", children: assistantQuery }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 818,
              columnNumber: 19
            }),
            isAssistantLoading && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-slate-500 p-2 text-xs font-medium", children: [
              /* @__PURE__ */ jsxDEV(Loader2, { size: 16, className: "animate-spin text-red-500" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 824,
                columnNumber: 21
              }),
              " Analizando consulta..."
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 823,
              columnNumber: 19
            }),
            assistantResponse && !isAssistantLoading && /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-red-600 text-white p-3 rounded-lg rounded-tr-none w-[85%] self-end shadow-sm", children: assistantQuery }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 829,
                columnNumber: 21
              }),
              /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-200 text-slate-800 p-3 rounded-lg rounded-tl-none w-[90%] self-start whitespace-pre-wrap shadow-sm", children: assistantResponse }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 832,
                columnNumber: 21
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 828,
              columnNumber: 19
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 813,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("form", { onSubmit: handleAssistantSubmit, className: "p-3 border-t border-slate-200 bg-white flex gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: assistantQuery,
                onChange: (e) => setAssistantQuery(e.target.value),
                placeholder: "Ej: Mi moto suena al frenar...",
                className: "flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-red-500",
                disabled: isAssistantLoading
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 839,
                columnNumber: 17
              }
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "submit",
                disabled: isAssistantLoading || !assistantQuery.trim(),
                className: "bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white p-2 rounded-lg transition-colors flex-shrink-0",
                children: /* @__PURE__ */ jsxDEV(Sparkles, { size: 18 }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 852,
                  columnNumber: 19
                })
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 847,
                columnNumber: 17
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 838,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 803,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsAssistantOpen(!isAssistantOpen),
            className: "bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-red-500/40 transition-transform hover:scale-105",
            children: isAssistantOpen ? /* @__PURE__ */ jsxDEV(X, { size: 24 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 861,
              columnNumber: 32
            }) : /* @__PURE__ */ jsxDEV(Bot, { size: 28 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 861,
              columnNumber: 50
            })
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 857,
            columnNumber: 11
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 801,
        columnNumber: 9
      }),
      isQrOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[130] flex items-center justify-center p-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-slate-900/40", onClick: () => setIsQrOpen(false) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 869,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm z-40", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-800", children: "QR \u2014 Abrir App" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 872,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("button", { onClick: () => setIsQrOpen(false), className: "text-slate-400 hover:text-slate-800 p-2 rounded-full", children: /* @__PURE__ */ jsxDEV(X, { size: 18 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 873,
              columnNumber: 125
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 873,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 871,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-4", children: qrDataUrl ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV("img", { src: qrDataUrl, alt: "QR MRR", className: "w-64 h-64 object-contain bg-white p-2 border rounded-md" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 878,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 text-center", children: "Escanea este QR para abrir la aplicaci\xF3n en el navegador del cliente." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 879,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 mt-2", children: [
              /* @__PURE__ */ jsxDEV("button", { onClick: downloadQr, className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg", children: "Descargar PNG" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 881,
                columnNumber: 23
              }),
              /* @__PURE__ */ jsxDEV("button", { onClick: () => {
                navigator.clipboard?.writeText(window.location.href.split("#")[0]);
                alert("Enlace copiado al portapapeles");
              }, className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg", children: "Copiar enlace" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 882,
                columnNumber: 23
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 880,
              columnNumber: 21
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 877,
            columnNumber: 19
          }) : /* @__PURE__ */ jsxDEV("div", { className: "p-6 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500", children: isGeneratingQr ? "Generando QR..." : "Presiona el bot\xF3n para generar el QR" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 887,
            columnNumber: 21
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 886,
            columnNumber: 19
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 875,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 870,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 868,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-6 left-6 z-50 flex flex-col items-start", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              if (!qrDataUrl) generateQrForApp();
              else setIsQrOpen(true);
            },
            title: "Generar / Mostrar QR de la App",
            className: "bg-slate-900 hover:bg-slate-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105",
            children: /* @__PURE__ */ jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsxDEV("rect", { x: "3", y: "3", width: "7", height: "7" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 906,
                columnNumber: 186
              }),
              /* @__PURE__ */ jsxDEV("rect", { x: "14", y: "3", width: "7", height: "7" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 906,
                columnNumber: 226
              }),
              /* @__PURE__ */ jsxDEV("rect", { x: "14", y: "14", width: "7", height: "7" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 906,
                columnNumber: 267
              }),
              /* @__PURE__ */ jsxDEV("path", { d: "M7 14h.01" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 906,
                columnNumber: 309
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 906,
              columnNumber: 13
            })
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 897,
            columnNumber: 11
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 text-xs text-slate-500 text-center", children: "QR App" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 908,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 896,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 746,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Footer, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 912,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 727,
    columnNumber: 5
  });
};
const ProductDetail = ({ goHome, cart, logout, selectedProduct, handleAddToCart, setIsCartOpen, searchQuery, handleSearch }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    setActiveImageIndex(0);
    setQty(1);
  }, [selectedProduct]);
  if (!selectedProduct) return null;
  const hasCustomImages = selectedProduct.images && selectedProduct.images.length > 0;
  const displaySrc = hasCustomImages ? selectedProduct.images[activeImageIndex] : null;
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50 min-h-screen font-sans text-slate-800", children: [
    /* @__PURE__ */ jsxDEV(Header, { goHome, cart, logout, setIsCartOpen, searchQuery, handleSearch }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 933,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4 py-4 text-sm text-slate-500", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome("all"), children: "Inicio" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 937,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "mx-2", children: "/" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 938,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "hover:text-red-600 cursor-pointer transition-colors", onClick: () => goHome(selectedProduct.condition), children: [
        "Repuestos ",
        selectedProduct.condition === "Nuevo" ? "Nuevos" : "Usados"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 939,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "mx-2", children: "/" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 942,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-800 font-medium", children: selectedProduct.name }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 943,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 936,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("main", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row p-6 md:p-10 gap-10", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "md:w-1/2 flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-200 rounded-xl overflow-hidden mb-4 aspect-square bg-white", children: /* @__PURE__ */ jsxDEV(ProductImagePlaceholder, { type: selectedProduct.image, src: displaySrc }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 953,
            columnNumber: 18
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 952,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4 overflow-x-auto pb-2", children: hasCustomImages ? selectedProduct.images.map((img, idx) => /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setActiveImageIndex(idx),
              className: `w-20 h-20 flex-shrink-0 border-2 rounded-lg p-0.5 cursor-pointer overflow-hidden transition-all bg-white ${activeImageIndex === idx ? "border-red-500 opacity-100" : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400"}`,
              children: /* @__PURE__ */ jsxDEV("img", { src: img, className: "w-full h-full object-contain rounded-md", alt: `Miniatura ${idx + 1}` }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 964,
                columnNumber: 23
              })
            },
            idx,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 959,
              columnNumber: 21
            }
          )) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-20 flex-shrink-0 border-2 border-red-500 rounded-lg p-1 cursor-pointer overflow-hidden", children: /* @__PURE__ */ jsxDEV(ProductImagePlaceholder, { type: selectedProduct.image }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 970,
              columnNumber: 23
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 969,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-20 flex-shrink-0 border border-slate-200 rounded-lg p-1 cursor-pointer hover:border-slate-400 opacity-60 hover:opacity-100 transition-all overflow-hidden", children: /* @__PURE__ */ jsxDEV(ProductImagePlaceholder, { type: selectedProduct.image }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 973,
              columnNumber: 24
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 972,
              columnNumber: 21
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 968,
            columnNumber: 19
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 956,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 951,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "md:w-1/2 flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-bold text-slate-900 mb-4 leading-tight", children: selectedProduct.name }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 982,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2 mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 text-sm", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium w-24", children: "Marca:" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 986,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-slate-800", children: selectedProduct.brand }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 987,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 985,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 text-sm", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium w-24", children: "Referencia:" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 990,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-700", children: selectedProduct.reference }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 991,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 989,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 text-sm", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium w-24", children: "Condici\xF3n:" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 994,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV(
                "span",
                {
                  onClick: () => goHome(selectedProduct.condition),
                  className: `px-2 py-1 rounded text-xs font-bold border cursor-pointer hover:opacity-80 transition-opacity ${selectedProduct.condition === "Nuevo" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`,
                  children: selectedProduct.condition
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 995,
                  columnNumber: 19
                }
              )
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 993,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 984,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "mb-6 flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1.5 rounded border border-emerald-100", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle, { size: 16 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1005,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sm", children: "Art\xEDculo Disponible" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1006,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1004,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "mb-8 border-t border-b border-slate-100 py-6", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-baseline gap-2 mb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-4xl font-black text-red-600", children: [
              "$",
              selectedProduct.price
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1011,
              columnNumber: 19
            }),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm text-slate-400 italic", children: "Impuestos incluidos" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1012,
              columnNumber: 19
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1010,
            columnNumber: 17
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1009,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center border border-slate-300 rounded-lg overflow-hidden h-12 w-32 bg-white flex-shrink-0", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setQty((q) => Math.max(1, q - 1)),
                  className: "w-10 h-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors",
                  children: /* @__PURE__ */ jsxDEV(Minus, { size: 16 }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1023,
                    columnNumber: 21
                  })
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 1019,
                  columnNumber: 19
                }
              ),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: qty,
                  readOnly: true,
                  className: "w-full h-full text-center font-bold text-slate-800 outline-none"
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 1025,
                  columnNumber: 19
                }
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setQty((q) => q + 1),
                  className: "w-10 h-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors",
                  children: /* @__PURE__ */ jsxDEV(Plus, { size: 16 }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1035,
                    columnNumber: 21
                  })
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 1031,
                  columnNumber: 19
                }
              )
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1018,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleAddToCart(selectedProduct, qty),
                className: "flex-1 bg-slate-900 hover:bg-red-600 text-white h-12 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-red-500/30 uppercase tracking-wide",
                children: [
                  /* @__PURE__ */ jsxDEV(ShoppingCart, { size: 20 }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1043,
                    columnNumber: 19
                  }),
                  " A\xF1adir al carrito"
                ]
              },
              void 0,
              true,
              {
                fileName: "<stdin>",
                lineNumber: 1039,
                columnNumber: 17
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1017,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 981,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 948,
        columnNumber: 11
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 947,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-10 mb-20 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-200 bg-slate-50", children: /* @__PURE__ */ jsxDEV("h2", { className: "px-8 py-4 font-bold text-slate-800 border-b-2 border-red-600 uppercase tracking-wider text-sm", children: "Descripci\xF3n" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 1054,
          columnNumber: 13
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 1053,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "p-8 text-slate-600 leading-relaxed text-sm md:text-base", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "mb-4", children: selectedProduct.description }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1059,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("p", { children: [
            "En ",
            /* @__PURE__ */ jsxDEV("strong", { children: "Moto Repuestos Romero (MRR)" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1060,
              columnNumber: 21
            }),
            ", nos aseguramos de que cada pieza, sea nueva o usada, cumpla con los m\xE1s altos est\xE1ndares de calidad antes de llegar a tus manos. Entendemos la importancia de mantener tu motocicleta en \xF3ptimas condiciones, por lo que solo ofrecemos repuestos garantizados."
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1060,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1058,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 1052,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 946,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Footer, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 1065,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 932,
    columnNumber: 5
  });
};
const AdminDashboard = ({ logout, products, setProducts, orders, setOrders, clients, setClients }) => {
  const [adminView, setAdminView] = useState("inventory");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [descError, setDescError] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersTableRef = React.useRef(null);
  const clientsTableRef = React.useRef(null);
  const [ordersScrollMax, setOrdersScrollMax] = useState(0);
  const [ordersScrollPos, setOrdersScrollPos] = useState(0);
  const [clientsScrollMax, setClientsScrollMax] = useState(0);
  const [clientsScrollPos, setClientsScrollPos] = useState(0);
  const updateScrollInfo = () => {
    if (ordersTableRef.current) {
      const el = ordersTableRef.current;
      setOrdersScrollMax(Math.max(0, el.scrollWidth - el.clientWidth));
      setOrdersScrollPos(el.scrollLeft || 0);
    }
    if (clientsTableRef.current) {
      const el = clientsTableRef.current;
      setClientsScrollMax(Math.max(0, el.scrollWidth - el.clientWidth));
      setClientsScrollPos(el.scrollLeft || 0);
    }
  };
  useEffect(() => {
    updateScrollInfo();
    const ro = new ResizeObserver(updateScrollInfo);
    if (ordersTableRef.current) ro.observe(ordersTableRef.current);
    if (clientsTableRef.current) ro.observe(clientsTableRef.current);
    window.addEventListener("resize", updateScrollInfo);
    return () => {
      window.removeEventListener("resize", updateScrollInfo);
      try {
        ro.disconnect();
      } catch {
      }
    };
  }, [products, orders, clients]);
  const handleOrdersSlider = (e) => {
    const val = Number(e.target.value);
    if (ordersTableRef.current) {
      ordersTableRef.current.scrollLeft = val;
      setOrdersScrollPos(val);
    }
  };
  const handleClientsSlider = (e) => {
    const val = Number(e.target.value);
    if (clientsTableRef.current) {
      clientsTableRef.current.scrollLeft = val;
      setClientsScrollPos(val);
    }
  };
  const onOrdersScroll = () => {
    if (ordersTableRef.current) setOrdersScrollPos(ordersTableRef.current.scrollLeft);
  };
  const onClientsScroll = () => {
    if (clientsTableRef.current) setClientsScrollPos(clientsTableRef.current.scrollLeft);
  };
  const [showJson, setShowJson] = useState(false);
  const [jsonContent, setJsonContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const markOrderAsDelivered = (orderId) => {
    if (!orderId) return;
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: "Entregado" } : o));
    setSelectedOrder((prev) => prev ? { ...prev, status: "Entregado" } : prev);
  };
  const handleGenerateDesc = async () => {
    if (!editingProduct.name) {
      setDescError("Ingresa al menos el nombre del producto para que la IA sepa de qu\xE9 escribir.");
      return;
    }
    setDescError("");
    setIsGeneratingDesc(true);
    try {
      const prompt = `Act\xFAa como un experto en ventas de repuestos de motos. Escribe una descripci\xF3n comercial, atractiva y t\xE9cnica de un solo p\xE1rrafo para el siguiente producto. Nombre: ${editingProduct.name}, Marca: ${editingProduct.brand || "Gen\xE9rica"}, Categor\xEDa: ${editingProduct.category || "Repuesto"}, Condici\xF3n: ${editingProduct.condition}. Resalta los beneficios de comprarlo.`;
      const result = await callGemini(prompt);
      setEditingProduct({ ...editingProduct, description: result });
    } catch (error) {
      setDescError("Error al generar la descripci\xF3n con IA. Intenta de nuevo.");
    } finally {
      setIsGeneratingDesc(false);
    }
  };
  const handleEdit = (p) => {
    setEditingProduct({ ...p });
    setAdminView("productForm");
    setSidebarOpen(false);
  };
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };
  const handleNewProduct = () => {
    setEditingProduct({
      id: null,
      name: "",
      brand: "",
      reference: "",
      price: "",
      condition: "Nuevo",
      category: "Motor",
      stock: 1,
      description: "",
      image: "default",
      images: []
    });
    setAdminView("productForm");
    setSidebarOpen(false);
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct((prev) => ({
          ...prev,
          images: [...prev.images || [], reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };
  const removeImage = (indexToRemove) => {
    setEditingProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };
  const saveProduct = (e) => {
    e.preventDefault();
    if (editingProduct.id) {
      setProducts(products.map((p) => p.id === editingProduct.id ? editingProduct : p));
    } else {
      setProducts([...products, { ...editingProduct, id: Date.now() }]);
    }
    setAdminView("inventory");
  };
  const generateJsonExport = () => {
    const payload = {
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      products,
      orders,
      clients
    };
    const content = JSON.stringify(payload, null, 2);
    setJsonContent(content);
    setShowJson(true);
    setSidebarOpen(false);
  };
  const copyJsonToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonContent);
      alert("JSON copiado al portapapeles");
    } catch (err) {
      alert("No se pudo copiar. Selecciona y copia manualmente.");
    }
  };
  const downloadJson = () => {
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mrr_export_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-slate-100 flex font-sans", children: [
    sidebarOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-40 md:hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/40", onClick: () => setSidebarOpen(false) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 1265,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 1264,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("aside", { className: `fixed z-50 top-0 left-0 h-full w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-64 md:flex-shrink-0`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-slate-800 flex justify-center", children: /* @__PURE__ */ jsxDEV(Logo, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 1271,
        columnNumber: 12
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 1270,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 flex flex-col gap-2 flex-grow", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-2", children: "Panel de Control" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 1274,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setAdminView("inventory");
              setSidebarOpen(false);
            },
            className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${adminView === "inventory" || adminView === "productForm" ? "bg-red-600 text-white" : "hover:bg-slate-800 text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Package, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1279,
                columnNumber: 13
              }),
              " Inventario"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 1275,
            columnNumber: 11
          }
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setAdminView("orders");
              setSidebarOpen(false);
            },
            className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${adminView === "orders" ? "bg-red-600 text-white" : "hover:bg-slate-800 text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxDEV(ShoppingCart, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1285,
                columnNumber: 13
              }),
              " Pedidos"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 1281,
            columnNumber: 11
          }
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setAdminView("clients");
              setSidebarOpen(false);
            },
            className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${adminView === "clients" ? "bg-red-600 text-white" : "hover:bg-slate-800 text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxDEV(User, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1291,
                columnNumber: 13
              }),
              " Clientes"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 1287,
            columnNumber: 11
          }
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              generateJsonExport();
            },
            className: "w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-lg font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors",
            title: "Exportar productos, pedidos y clientes como JSON",
            children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { size: 16 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1300,
                columnNumber: 13
              }),
              " Exportar JSON"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 1295,
            columnNumber: 11
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 1273,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-t border-slate-800", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: logout,
          className: "w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-700 hover:bg-slate-800 rounded-lg font-medium text-slate-300 transition-colors",
          children: [
            /* @__PURE__ */ jsxDEV(LogOut, { size: 18 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1308,
              columnNumber: 13
            }),
            " Salir"
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 1304,
          columnNumber: 11
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 1303,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 1269,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("main", { className: "flex-1 p-4 md:p-8 overflow-y-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between md:hidden mb-4", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setSidebarOpen(true), className: "p-2 bg-slate-900 text-white rounded-lg", children: /* @__PURE__ */ jsxDEV(Menu, { size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 1318,
          columnNumber: 13
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 1317,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold text-slate-800", children: "Panel Admin" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1321,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: "Moto Repuestos Romero" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1322,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1320,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "w-8" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 1324,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 1316,
        columnNumber: 9
      }),
      adminView === "inventory" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-8", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-slate-800", children: "Gesti\xF3n de Inventario" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1331,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500", children: "Administra los repuestos nuevos y usados." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1332,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1330,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("button", { onClick: handleNewProduct, className: "bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-all", children: [
            /* @__PURE__ */ jsxDEV(Plus, { size: 18 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1335,
              columnNumber: 17
            }),
            " Nuevo Producto"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1334,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1329,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-50 border-b border-slate-200", children: [
            /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "ID" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1343,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Producto" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1344,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Condici\xF3n" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1345,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Precio" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1346,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Stock" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1347,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm text-right", children: "Acciones" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1348,
              columnNumber: 21
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1342,
            columnNumber: 19
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1341,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("tbody", { children: [
            products.length === 0 && /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: "6", className: "p-8 text-center text-slate-500", children: "No hay productos en el inventario." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1353,
              columnNumber: 25
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1353,
              columnNumber: 21
            }),
            products.map((p) => /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-slate-100 hover:bg-slate-50", children: [
              /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-slate-500 text-sm", children: [
                "#",
                p.id
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1357,
                columnNumber: 23
              }),
              /* @__PURE__ */ jsxDEV("td", { className: "p-4", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-slate-800", children: p.name }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1359,
                  columnNumber: 25
                }),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: [
                  p.reference,
                  " | ",
                  p.brand,
                  " | ",
                  /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-slate-600", children: p.category }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1360,
                    columnNumber: 91
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 1360,
                  columnNumber: 25
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1358,
                columnNumber: 23
              }),
              /* @__PURE__ */ jsxDEV("td", { className: "p-4", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-1 rounded text-xs font-bold border ${p.condition === "Nuevo" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`, children: p.condition }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1363,
                columnNumber: 25
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1362,
                columnNumber: 23
              }),
              /* @__PURE__ */ jsxDEV("td", { className: "p-4 font-medium text-slate-800", children: [
                "$",
                Number(p.price).toLocaleString("es-CO")
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1367,
                columnNumber: 23
              }),
              /* @__PURE__ */ jsxDEV("td", { className: "p-4", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-1 rounded text-sm font-medium ${p.stock > 0 ? "bg-slate-100 text-slate-700" : "bg-red-100 text-red-700"}`, children: [
                p.stock,
                " unid."
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1369,
                columnNumber: 25
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1368,
                columnNumber: 23
              }),
              /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-right", children: [
                /* @__PURE__ */ jsxDEV("button", { onClick: () => handleEdit(p), className: "text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-1", title: "Editar", children: /* @__PURE__ */ jsxDEV(Edit, { size: 18 }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1375,
                  columnNumber: 27
                }) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1374,
                  columnNumber: 25
                }),
                /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete(p.id), className: "text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors", title: "Eliminar", children: /* @__PURE__ */ jsxDEV(Trash2, { size: 18 }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1378,
                  columnNumber: 27
                }) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1377,
                  columnNumber: 25
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1373,
                columnNumber: 23
              })
            ] }, p.id, true, {
              fileName: "<stdin>",
              lineNumber: 1356,
              columnNumber: 21
            }))
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1351,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1340,
          columnNumber: 15
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 1339,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 1328,
        columnNumber: 11
      }),
      adminView === "productForm" && editingProduct && /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl mx-auto pb-10", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxDEV("button", { onClick: () => setAdminView("inventory"), className: "text-slate-500 hover:text-red-600 transition-colors bg-white p-2 rounded-full shadow-sm border border-slate-200", children: /* @__PURE__ */ jsxDEV(ChevronRight, { size: 24, className: "rotate-180" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1393,
            columnNumber: 18
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1392,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-slate-800", children: editingProduct.id ? "Editar Producto" : "Crear Nuevo Producto" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1396,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500", children: "Completa los datos del repuesto." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1397,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1395,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1391,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("form", { onSubmit: saveProduct, className: "bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Nombre del Producto" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1404,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("input", { required: true, type: "text", value: editingProduct.name, onChange: (e) => setEditingProduct({ ...editingProduct, name: e.target.value }), className: "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1405,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1403,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Marca" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1408,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("input", { required: true, type: "text", value: editingProduct.brand, onChange: (e) => setEditingProduct({ ...editingProduct, brand: e.target.value }), className: "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1409,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1407,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Referencia" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1412,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("input", { required: true, type: "text", value: editingProduct.reference, onChange: (e) => setEditingProduct({ ...editingProduct, reference: e.target.value }), className: "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1413,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1411,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Categor\xEDa" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1416,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("select", { required: true, value: editingProduct.category || "Motor", onChange: (e) => setEditingProduct({ ...editingProduct, category: e.target.value }), className: "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none bg-white", children: [
                /* @__PURE__ */ jsxDEV("option", { value: "Motor", children: "Motor" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1418,
                  columnNumber: 21
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "Accesorios", children: "Accesorios" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1419,
                  columnNumber: 21
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "El\xE9ctrico", children: "El\xE9ctrico" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1420,
                  columnNumber: 21
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "Tren Delantero", children: "Tren Delantero" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1421,
                  columnNumber: 21
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "Tren Trasero", children: "Tren Trasero" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1422,
                  columnNumber: 21
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "Parte Media", children: "Parte Media" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1423,
                  columnNumber: 21
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "L\xEDquidos", children: "L\xEDquidos" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1424,
                  columnNumber: 21
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1417,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1415,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Precio" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1428,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("input", { required: true, type: "number", value: editingProduct.price, onChange: (e) => setEditingProduct({ ...editingProduct, price: e.target.value ? parseInt(e.target.value) : "" }), className: "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1429,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1427,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Stock disponible" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1432,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("input", { required: true, type: "number", value: editingProduct.stock, onChange: (e) => setEditingProduct({ ...editingProduct, stock: e.target.value ? parseInt(e.target.value) : "" }), className: "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1433,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1431,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Condici\xF3n" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1436,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "condition", value: "Nuevo", checked: editingProduct.condition === "Nuevo", onChange: (e) => setEditingProduct({ ...editingProduct, condition: e.target.value }), className: "text-red-600 focus:ring-red-500" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1439,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("span", { children: "Nuevo" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1440,
                    columnNumber: 23
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 1438,
                  columnNumber: 21
                }),
                /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "condition", value: "Usado", checked: editingProduct.condition === "Usado", onChange: (e) => setEditingProduct({ ...editingProduct, condition: e.target.value }), className: "text-red-600 focus:ring-red-500" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1443,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("span", { children: "Usado" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1444,
                    columnNumber: 23
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 1442,
                  columnNumber: 21
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1437,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1435,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "col-span-2 relative", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-end mb-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700", children: "Descripci\xF3n corta" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1450,
                  columnNumber: 21
                }),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: handleGenerateDesc,
                    disabled: isGeneratingDesc,
                    className: "text-xs bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-md font-bold flex items-center gap-1 transition-colors disabled:opacity-50",
                    children: [
                      isGeneratingDesc ? /* @__PURE__ */ jsxDEV(Loader2, { size: 14, className: "animate-spin" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1457,
                        columnNumber: 43
                      }) : /* @__PURE__ */ jsxDEV(Sparkles, { size: 14 }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1457,
                        columnNumber: 91
                      }),
                      "\u2728 Generar Descripci\xF3n con IA"
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "<stdin>",
                    lineNumber: 1451,
                    columnNumber: 21
                  }
                )
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1449,
                columnNumber: 19
              }),
              descError && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-red-500 mb-1", children: descError }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1461,
                columnNumber: 33
              }),
              /* @__PURE__ */ jsxDEV("textarea", { required: true, rows: "4", value: editingProduct.description, onChange: (e) => setEditingProduct({ ...editingProduct, description: e.target.value }), className: "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1462,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1448,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Galer\xEDa de Im\xE1genes (Sube varias fotos)" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1467,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl relative hover:bg-slate-50 transition-colors", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-center", children: [
                /* @__PURE__ */ jsxDEV(Upload, { className: "mx-auto h-12 w-12 text-slate-400" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1470,
                  columnNumber: 23
                }),
                /* @__PURE__ */ jsxDEV("div", { className: "flex text-sm text-slate-600 justify-center", children: [
                  /* @__PURE__ */ jsxDEV("label", { className: "relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "Sube im\xE1genes" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1473,
                      columnNumber: 27
                    }),
                    /* @__PURE__ */ jsxDEV("input", { type: "file", multiple: true, accept: "image/*", className: "sr-only", onChange: handleImageUpload }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1474,
                      columnNumber: 27
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1472,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("p", { className: "pl-1", children: "desde tu galer\xEDa o pc" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1476,
                    columnNumber: 25
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 1471,
                  columnNumber: 23
                }),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: "PNG, JPG, JPEG permitidos" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1478,
                  columnNumber: 23
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1469,
                columnNumber: 21
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1468,
                columnNumber: 19
              }),
              editingProduct.images && editingProduct.images.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4", children: editingProduct.images.map((imgSrc, idx) => /* @__PURE__ */ jsxDEV("div", { className: "relative group aspect-square rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm p-1", children: [
                /* @__PURE__ */ jsxDEV("img", { src: imgSrc, alt: `Subida ${idx}`, className: "w-full h-full object-contain" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1487,
                  columnNumber: 27
                }),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeImage(idx),
                    className: "bg-red-600 text-white rounded-full p-1.5 transform hover:scale-110 transition-transform",
                    title: "Eliminar imagen",
                    children: /* @__PURE__ */ jsxDEV(X, { size: 16 }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1495,
                      columnNumber: 31
                    })
                  },
                  void 0,
                  false,
                  {
                    fileName: "<stdin>",
                    lineNumber: 1489,
                    columnNumber: 29
                  }
                ) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1488,
                  columnNumber: 27
                })
              ] }, idx, true, {
                fileName: "<stdin>",
                lineNumber: 1486,
                columnNumber: 25
              })) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1484,
                columnNumber: 21
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1466,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1402,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-6 border-t border-slate-100 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setAdminView("inventory"), className: "px-6 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors", children: "Cancelar" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1506,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-colors", children: [
              /* @__PURE__ */ jsxDEV(Save, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1508,
                columnNumber: 19
              }),
              " ",
              editingProduct.id ? "Actualizar Producto" : "Guardar Producto"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1507,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1505,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1401,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 1390,
        columnNumber: 11
      }),
      adminView === "orders" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-slate-800", children: "Pedidos Recientes" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1518,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500", children: "Historial de \xF3rdenes de compra." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1519,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1517,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 border-b border-slate-100 bg-slate-50 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-500", children: "Desplazar tabla:" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1524,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "aria-label": "Desplazar pedidos",
                type: "range",
                min: "0",
                max: ordersScrollMax,
                value: ordersScrollPos,
                onChange: handleOrdersSlider,
                className: "flex-1 h-2"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 1525,
                columnNumber: 17
              }
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-500 w-20 text-right", children: [
              Math.round(ordersScrollPos),
              " / ",
              Math.round(ordersScrollMax)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1534,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1523,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              ref: ordersTableRef,
              onScroll: onOrdersScroll,
              className: "overflow-x-auto",
              style: { WebkitOverflowScrolling: "touch" },
              children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse min-w-[900px]", children: [
                /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-50 border-b border-slate-200", children: [
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "ID Pedido" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1546,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Fecha" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1547,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Cliente" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1548,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Tel\xE9fono" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1549,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Total" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1550,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Estado" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1551,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm text-right", children: "Acciones" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1552,
                    columnNumber: 23
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 1545,
                  columnNumber: 21
                }) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1544,
                  columnNumber: 19
                }),
                /* @__PURE__ */ jsxDEV("tbody", { children: orders.map((o) => /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-slate-100 hover:bg-slate-50", children: [
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 font-medium text-slate-800", children: o.id }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1558,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-slate-500 text-sm", children: o.date }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1559,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-slate-800", children: o.client }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1560,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-slate-700 text-sm", children: o.phone || "\u2014" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1561,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 font-bold text-red-600", children: [
                    "$",
                    o.total
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1562,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-1 rounded text-xs font-bold border ${o.status === "Entregado" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: o.status }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1564,
                    columnNumber: 27
                  }) }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1563,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setSelectedOrder(o),
                      className: "bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                      children: "Ver Datos"
                    },
                    void 0,
                    false,
                    {
                      fileName: "<stdin>",
                      lineNumber: 1569,
                      columnNumber: 27
                    }
                  ) }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1568,
                    columnNumber: 25
                  })
                ] }, o.id, true, {
                  fileName: "<stdin>",
                  lineNumber: 1557,
                  columnNumber: 23
                })) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1555,
                  columnNumber: 19
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1543,
                columnNumber: 17
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 1537,
              columnNumber: 15
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1521,
          columnNumber: 13
        }),
        selectedOrder && (() => {
          let startY = 0;
          let currentTop = 0;
          let dragging = false;
          const ref = { el: null };
          const onPointerDown = (e) => {
            dragging = true;
            startY = e.clientY || e.touches && e.touches[0].clientY || 0;
            const rect = ref.el?.getBoundingClientRect();
            currentTop = rect ? rect.top : 0;
            if (ref.el && e.target.setPointerCapture) {
              try {
                e.target.setPointerCapture(e.pointerId);
              } catch {
              }
            }
            document.addEventListener("pointermove", onPointerMove);
            document.addEventListener("pointerup", onPointerUp);
          };
          const onPointerMove = (e) => {
            if (!dragging) return;
            const y = e.clientY || e.touches && e.touches[0].clientY || 0;
            const delta = y - startY;
            const maxTranslate = window.innerHeight - 120;
            const newTop = Math.min(Math.max(currentTop + delta, 0), maxTranslate);
            if (ref.el) {
              ref.el.style.transform = `translateY(${newTop}px)`;
            }
          };
          const onPointerUp = (e) => {
            dragging = false;
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", onPointerUp);
          };
          return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[100] flex justify-end animate-fadeIn", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-slate-900/50 backdrop-blur-sm", onClick: () => setSelectedOrder(null) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1622,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                ref: (el) => ref.el = el,
                className: "relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col touch-pan-y",
                style: { transition: "transform .08s linear" },
                children: [
                  /* @__PURE__ */ jsxDEV(
                    "div",
                    {
                      onPointerDown,
                      className: "p-3 border-b border-slate-200 bg-slate-50 cursor-grab touch-none flex items-center justify-center",
                      style: { WebkitUserSelect: "none", userSelect: "none" },
                      title: "Arrastra para mover",
                      children: /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-1.5 bg-slate-300 rounded-full" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1635,
                        columnNumber: 25
                      })
                    },
                    void 0,
                    false,
                    {
                      fileName: "<stdin>",
                      lineNumber: 1629,
                      columnNumber: 23
                    }
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-slate-200 flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-slate-800 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV(Package, { size: 24, className: "text-red-600" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1640,
                        columnNumber: 27
                      }),
                      " Detalles del Pedido"
                    ] }, void 0, true, {
                      fileName: "<stdin>",
                      lineNumber: 1639,
                      columnNumber: 25
                    }),
                    /* @__PURE__ */ jsxDEV("button", { onClick: () => setSelectedOrder(null), className: "p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1643,
                      columnNumber: 27
                    }) }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1642,
                      columnNumber: 25
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1638,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-slate-500", children: [
                        "Orden: ",
                        selectedOrder.id
                      ] }, void 0, true, {
                        fileName: "<stdin>",
                        lineNumber: 1649,
                        columnNumber: 27
                      }),
                      /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-1 rounded text-xs font-bold border ${selectedOrder.status === "Entregado" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: selectedOrder.status }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1650,
                        columnNumber: 27
                      })
                    ] }, void 0, true, {
                      fileName: "<stdin>",
                      lineNumber: 1648,
                      columnNumber: 25
                    }),
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-3", children: "Datos del Comprador" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1657,
                        columnNumber: 28
                      }),
                      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Nombre Completo" }, void 0, false, {
                            fileName: "<stdin>",
                            lineNumber: 1660,
                            columnNumber: 33
                          }),
                          /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedOrder.client }, void 0, false, {
                            fileName: "<stdin>",
                            lineNumber: 1661,
                            columnNumber: 33
                          })
                        ] }, void 0, true, {
                          fileName: "<stdin>",
                          lineNumber: 1659,
                          columnNumber: 31
                        }),
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Tel\xE9fono (WhatsApp)" }, void 0, false, {
                            fileName: "<stdin>",
                            lineNumber: 1664,
                            columnNumber: 33
                          }),
                          /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800 flex items-center gap-2", children: [
                            selectedOrder.phone,
                            /* @__PURE__ */ jsxDEV("a", { href: `https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, "")}`, target: "_blank", rel: "noreferrer", className: "text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold transition-colors", children: "Chatear" }, void 0, false, {
                              fileName: "<stdin>",
                              lineNumber: 1667,
                              columnNumber: 35
                            })
                          ] }, void 0, true, {
                            fileName: "<stdin>",
                            lineNumber: 1665,
                            columnNumber: 33
                          })
                        ] }, void 0, true, {
                          fileName: "<stdin>",
                          lineNumber: 1663,
                          columnNumber: 31
                        })
                      ] }, void 0, true, {
                        fileName: "<stdin>",
                        lineNumber: 1658,
                        columnNumber: 28
                      })
                    ] }, void 0, true, {
                      fileName: "<stdin>",
                      lineNumber: 1656,
                      columnNumber: 25
                    }),
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-3", children: "M\xE9todo de Entrega" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1677,
                        columnNumber: 28
                      }),
                      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Selecci\xF3n del Cliente" }, void 0, false, {
                            fileName: "<stdin>",
                            lineNumber: 1680,
                            columnNumber: 33
                          }),
                          /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-slate-800", children: selectedOrder.deliveryMethod === "pickup" ? "\u{1F3EA} Retirar en Tienda" : "\u{1F69A} Env\xEDo a Domicilio" }, void 0, false, {
                            fileName: "<stdin>",
                            lineNumber: 1681,
                            columnNumber: 33
                          })
                        ] }, void 0, true, {
                          fileName: "<stdin>",
                          lineNumber: 1679,
                          columnNumber: 30
                        }),
                        selectedOrder.deliveryMethod === "delivery" && selectedOrder.address && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200", children: [
                            /* @__PURE__ */ jsxDEV("div", { children: [
                              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Departamento" }, void 0, false, {
                                fileName: "<stdin>",
                                lineNumber: 1689,
                                columnNumber: 39
                              }),
                              /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedOrder.address.depto }, void 0, false, {
                                fileName: "<stdin>",
                                lineNumber: 1690,
                                columnNumber: 39
                              })
                            ] }, void 0, true, {
                              fileName: "<stdin>",
                              lineNumber: 1688,
                              columnNumber: 37
                            }),
                            /* @__PURE__ */ jsxDEV("div", { children: [
                              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Municipio" }, void 0, false, {
                                fileName: "<stdin>",
                                lineNumber: 1693,
                                columnNumber: 39
                              }),
                              /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedOrder.address.muni }, void 0, false, {
                                fileName: "<stdin>",
                                lineNumber: 1694,
                                columnNumber: 39
                              })
                            ] }, void 0, true, {
                              fileName: "<stdin>",
                              lineNumber: 1692,
                              columnNumber: 37
                            })
                          ] }, void 0, true, {
                            fileName: "<stdin>",
                            lineNumber: 1687,
                            columnNumber: 34
                          }),
                          /* @__PURE__ */ jsxDEV("div", { children: [
                            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Colonia / Cant\xF3n / Direcci\xF3n Exacta" }, void 0, false, {
                              fileName: "<stdin>",
                              lineNumber: 1698,
                              columnNumber: 37
                            }),
                            /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedOrder.address.colonia }, void 0, false, {
                              fileName: "<stdin>",
                              lineNumber: 1699,
                              columnNumber: 37
                            })
                          ] }, void 0, true, {
                            fileName: "<stdin>",
                            lineNumber: 1697,
                            columnNumber: 34
                          }),
                          /* @__PURE__ */ jsxDEV("div", { children: [
                            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Punto de Referencia" }, void 0, false, {
                              fileName: "<stdin>",
                              lineNumber: 1702,
                              columnNumber: 37
                            }),
                            /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800 italic text-sm", children: selectedOrder.address.ref || "Sin referencia" }, void 0, false, {
                              fileName: "<stdin>",
                              lineNumber: 1703,
                              columnNumber: 37
                            })
                          ] }, void 0, true, {
                            fileName: "<stdin>",
                            lineNumber: 1701,
                            columnNumber: 34
                          })
                        ] }, void 0, true, {
                          fileName: "<stdin>",
                          lineNumber: 1686,
                          columnNumber: 32
                        })
                      ] }, void 0, true, {
                        fileName: "<stdin>",
                        lineNumber: 1678,
                        columnNumber: 28
                      })
                    ] }, void 0, true, {
                      fileName: "<stdin>",
                      lineNumber: 1676,
                      columnNumber: 25
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1647,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-t border-slate-200 bg-slate-50 space-y-3", children: [
                    selectedOrder?.status !== "Entregado" && /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: () => markOrderAsDelivered(selectedOrder.id),
                        className: "w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors",
                        children: "Marcar como Entregado"
                      },
                      void 0,
                      false,
                      {
                        fileName: "<stdin>",
                        lineNumber: 1713,
                        columnNumber: 27
                      }
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: () => setSelectedOrder(null),
                        className: "w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors",
                        children: "Cerrar Panel"
                      },
                      void 0,
                      false,
                      {
                        fileName: "<stdin>",
                        lineNumber: 1721,
                        columnNumber: 25
                      }
                    )
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1710,
                    columnNumber: 23
                  })
                ]
              },
              void 0,
              true,
              {
                fileName: "<stdin>",
                lineNumber: 1623,
                columnNumber: 21
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1621,
            columnNumber: 19
          });
        })()
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 1516,
        columnNumber: 11
      }),
      adminView === "clients" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-slate-800", children: "Directorio de Clientes" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1739,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500", children: "Usuarios registrados y datos de env\xEDo." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1740,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1738,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 border-b border-slate-100 bg-slate-50 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-500", children: "Desplazar tabla:" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1745,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "aria-label": "Desplazar clientes",
                type: "range",
                min: "0",
                max: clientsScrollMax,
                value: clientsScrollPos,
                onChange: handleClientsSlider,
                className: "flex-1 h-2"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 1746,
                columnNumber: 17
              }
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-500 w-20 text-right", children: [
              Math.round(clientsScrollPos),
              " / ",
              Math.round(clientsScrollMax)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1755,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1744,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              ref: clientsTableRef,
              onScroll: onClientsScroll,
              className: "overflow-x-auto",
              style: { WebkitOverflowScrolling: "touch" },
              children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse min-w-[900px]", children: [
                /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-50 border-b border-slate-200", children: [
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "ID" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1767,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Nombre" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1768,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Contacto Principal" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1769,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Email" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1770,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm", children: "Registro" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1771,
                    columnNumber: 23
                  }),
                  /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-semibold text-slate-600 text-sm text-right", children: "Acciones" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1772,
                    columnNumber: 23
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 1766,
                  columnNumber: 21
                }) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1765,
                  columnNumber: 19
                }),
                /* @__PURE__ */ jsxDEV("tbody", { children: clients.map((c) => /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-slate-100 hover:bg-slate-50", children: [
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-slate-500 text-sm", children: c.id }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1778,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 font-medium text-slate-800", children: c.name }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1779,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-sm text-slate-600", children: /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-700", children: c.phone }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1781,
                    columnNumber: 27
                  }) }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1780,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-sm text-slate-600", children: c.email || "\u2014" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1783,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-slate-500 text-sm", children: c.registered }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1784,
                    columnNumber: 25
                  }),
                  /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setSelectedClient(c),
                      className: "bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                      children: "Ver Info"
                    },
                    void 0,
                    false,
                    {
                      fileName: "<stdin>",
                      lineNumber: 1786,
                      columnNumber: 27
                    }
                  ) }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 1785,
                    columnNumber: 25
                  })
                ] }, c.id, true, {
                  fileName: "<stdin>",
                  lineNumber: 1777,
                  columnNumber: 23
                })) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1775,
                  columnNumber: 19
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1764,
                columnNumber: 17
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 1758,
              columnNumber: 15
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1742,
          columnNumber: 13
        }),
        selectedClient && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[100] flex justify-end animate-fadeIn", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-slate-900/50 backdrop-blur-sm", onClick: () => setSelectedClient(null) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1803,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-slate-800 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(User, { size: 24, className: "text-red-600" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1807,
                  columnNumber: 23
                }),
                " Perfil del Cliente"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1806,
                columnNumber: 21
              }),
              /* @__PURE__ */ jsxDEV("button", { onClick: () => setSelectedClient(null), className: "p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1810,
                columnNumber: 23
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 1809,
                columnNumber: 21
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1805,
              columnNumber: 19
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-3", children: "Informaci\xF3n Personal" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1817,
                  columnNumber: 24
                }),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Nombre Completo" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1820,
                      columnNumber: 29
                    }),
                    /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedClient.name }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1821,
                      columnNumber: 29
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1819,
                    columnNumber: 27
                  }),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Tel\xE9fono (WhatsApp)" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1824,
                      columnNumber: 29
                    }),
                    /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800 flex items-center gap-2", children: [
                      selectedClient.phone,
                      /* @__PURE__ */ jsxDEV("a", { href: `https://wa.me/${selectedClient.phone.replace(/[^0-9]/g, "")}`, target: "_blank", rel: "noreferrer", className: "text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold transition-colors", children: "Chatear" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1827,
                        columnNumber: 31
                      })
                    ] }, void 0, true, {
                      fileName: "<stdin>",
                      lineNumber: 1825,
                      columnNumber: 29
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1823,
                    columnNumber: 27
                  }),
                  selectedClient.email && /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Correo Electr\xF3nico" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1834,
                      columnNumber: 31
                    }),
                    /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedClient.email }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1835,
                      columnNumber: 31
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1833,
                    columnNumber: 29
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 1818,
                  columnNumber: 24
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1816,
                columnNumber: 21
              }),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-3", children: "Datos de Env\xEDo" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 1843,
                  columnNumber: 24
                }),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Departamento" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1847,
                        columnNumber: 31
                      }),
                      /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedClient.address?.depto || "No registrado" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1848,
                        columnNumber: 31
                      })
                    ] }, void 0, true, {
                      fileName: "<stdin>",
                      lineNumber: 1846,
                      columnNumber: 29
                    }),
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Municipio" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1851,
                        columnNumber: 31
                      }),
                      /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedClient.address?.muni || "No registrado" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 1852,
                        columnNumber: 31
                      })
                    ] }, void 0, true, {
                      fileName: "<stdin>",
                      lineNumber: 1850,
                      columnNumber: 29
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1845,
                    columnNumber: 26
                  }),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Colonia / Cant\xF3n / Direcci\xF3n Exacta" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1856,
                      columnNumber: 29
                    }),
                    /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800", children: selectedClient.address?.colonia || "No registrado" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1857,
                      columnNumber: 29
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1855,
                    columnNumber: 26
                  }),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 mb-0.5", children: "Punto de Referencia" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1860,
                      columnNumber: 29
                    }),
                    /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-slate-800 italic text-sm", children: selectedClient.address?.ref || "Sin referencia" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 1861,
                      columnNumber: 29
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 1859,
                    columnNumber: 26
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 1844,
                  columnNumber: 24
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 1842,
                columnNumber: 21
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 1814,
              columnNumber: 19
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-t border-slate-200 bg-slate-50", children: /* @__PURE__ */ jsxDEV("button", { onClick: () => setSelectedClient(null), className: "w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors", children: "Cerrar Panel" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1867,
              columnNumber: 21
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1866,
              columnNumber: 19
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1804,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1802,
          columnNumber: 15
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 1737,
        columnNumber: 11
      }),
      showJson && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[120] flex items-center justify-center p-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-slate-900/40", onClick: () => setShowJson(false) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 1880,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "relative max-w-3xl w-full bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-50", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-slate-800", children: "Exportar Datos (JSON)" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1883,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("button", { onClick: () => setShowJson(false), className: "text-slate-400 hover:text-slate-800 p-2 rounded-full", children: /* @__PURE__ */ jsxDEV(X, { size: 18 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1885,
              columnNumber: 19
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1884,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1882,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("textarea", { readOnly: true, value: jsonContent, className: "w-full h-72 p-3 text-xs font-mono border rounded-lg bg-slate-50 overflow-auto" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1888,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3 mt-4", children: [
            /* @__PURE__ */ jsxDEV("button", { onClick: copyJsonToClipboard, className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg", children: "Copiar JSON" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1890,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("button", { onClick: downloadJson, className: "px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg", children: "Descargar .json" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1891,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("button", { onClick: () => {
              setJsonContent("");
              setShowJson(false);
            }, className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg", children: "Cerrar" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 1892,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 1889,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 1881,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 1879,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 1314,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 1260,
    columnNumber: 5
  });
};
function App() {
  const [view, setView] = useState("login");
  const [role, setRole] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [clients, setClients] = useState(initialClients);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const goHome = (filter = "all") => {
    setActiveFilter(filter);
    setSearchQuery("");
    setView("store");
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };
  const goToProduct = (p) => {
    setSelectedProduct(p);
    setView("product");
    window.scrollTo(0, 0);
  };
  const logout = () => {
    setRole(null);
    setView("login");
    setActiveFilter("all");
    setSearchQuery("");
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (view !== "store") {
      setView("store");
      setSelectedProduct(null);
      window.scrollTo(0, 0);
    }
  };
  const handleAddToCart = (product, quantity) => {
    const currentItem = { ...product, quantity };
    setCart((prev) => [...prev, currentItem]);
    setIsCartOpen(true);
  };
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    (() => {
      switch (view) {
        case "login":
          return /* @__PURE__ */ jsxDEV(LoginScreen, { setRole, setView }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1963,
            columnNumber: 20
          }, this);
        case "store":
          return /* @__PURE__ */ jsxDEV(
            StoreFront,
            {
              goHome,
              goToProduct,
              cart,
              logout,
              products,
              handleAddToCart,
              setIsCartOpen,
              activeFilter,
              searchQuery,
              handleSearch
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 1966,
              columnNumber: 15
            },
            this
          );
        case "product":
          return /* @__PURE__ */ jsxDEV(
            ProductDetail,
            {
              goHome,
              cart,
              logout,
              selectedProduct,
              handleAddToCart,
              setIsCartOpen,
              searchQuery,
              handleSearch
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 1981,
              columnNumber: 15
            },
            this
          );
        case "admin":
          return /* @__PURE__ */ jsxDEV(AdminDashboard, { logout, products, setProducts, orders, setOrders, clients, setClients }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1993,
            columnNumber: 20
          }, this);
        default:
          return /* @__PURE__ */ jsxDEV(LoginScreen, { setRole, setView }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 1995,
            columnNumber: 20
          }, this);
      }
    })(),
    /* @__PURE__ */ jsxDEV(CartDrawer, { isOpen: isCartOpen, setIsOpen: setIsCartOpen, cart, setCart, setOrders, setClients }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 1998,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 1959,
    columnNumber: 5
  }, this);
}
export {
  App as default
};
