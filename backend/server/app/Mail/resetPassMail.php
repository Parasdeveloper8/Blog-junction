<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class resetPassMail extends Mailable
{
    use Queueable, SerializesModels;
    public $msg;
    public $sub;
    /**
     * Create a new message instance.
     */
    public function __construct($msg,$subject)
    {
        $this->msg = $msg;
        $this->sub = $subject;
    }

    public function build()
    {
        return $this->subject($this->sub)
                    ->html($this->msg);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
