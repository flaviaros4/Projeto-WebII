
import { Injectable } from '@angular/core';

type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private containerId = 'app-toast-container-v1';
  private styleInjected = false;

  show(message: string, type: ToastType = 'info', duration = 3500) {
    if (typeof document === 'undefined') return;
    this.ensureContainerAndStyle();

    const toast = document.createElement('div');
    toast.className = `app-toast ${type}`;
    toast.setAttribute('role', 'status');

    const text = document.createElement('div');
    text.className = 'app-toast-text';
    text.textContent = message;
    toast.appendChild(text);

    const close = document.createElement('button');
    close.className = 'app-toast-close';
    close.type = 'button';
    close.innerHTML = '✕';
    close.onclick = () => this.removeToast(toast);
    toast.appendChild(close);

    const container = document.getElementById(this.containerId)!;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    const timer = window.setTimeout(() => this.removeToast(toast), duration);
    (toast as any).datasetTimeout = String(timer);
  }

  private removeToast(el: HTMLElement) {
    if (!el) return;
    const t = (el as any).datasetTimeout;
    if (t) clearTimeout(Number(t));
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }

  private ensureContainerAndStyle() {
    if (!document.getElementById(this.containerId)) {
      const container = document.createElement('div');
      container.id = this.containerId;
      container.className = 'app-toast-container';
      document.body.appendChild(container);
    }
    if (!this.styleInjected) {
      const style = document.createElement('style');
      style.id = 'app-toast-styles';
      style.innerHTML = `
.app-toast-container{position:fixed;top:18px;right:18px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none}
.app-toast{min-width:220px;max-width:420px;padding:10px 14px;border-radius:10px;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:10px;box-shadow:0 8px 24px rgba(0,0,0,.2);transform:translateY(-8px) scale(.98);opacity:0;transition:transform .22s,opacity .22s;pointer-events:auto}
.app-toast.show{transform:translateY(0) scale(1);opacity:1}
.app-toast.success{background:#28a745}
.app-toast.error{background:#dc3545}
.app-toast.info{background:#0d6efd}
.app-toast.warning{background:#ff9800;color:#222}
.app-toast-text{flex:1;padding-right:8px;font-size:15px;line-height:1.12}
.app-toast-close{background:rgba(255,255,255,.18);border:none;color:#fff;width:34px;height:34px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.app-toast-close:hover{background:rgba(255,255,255,.28)}
@media(max-width:480px){.app-toast{min-width:200px;max-width:90vw}.app-toast-close{width:30px;height:30px}}
      `;
      document.head.appendChild(style);
      this.styleInjected = true;
    }
  }
}
